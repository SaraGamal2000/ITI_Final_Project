
const cart = [];
const CartQuantity = (state = cart, action) => {
    // if (!action.payload || !Array.isArray(action.payload) || action.payload.length === 0) {
    //     console.error("Invalid payload:", action.payload);
    //     return state; 
    // }
    if (!action.payload || typeof action.payload !== 'object') {
        console.error("Invalid payload:", action.payload);
        return state; 
    }

    const product = action.payload[0];

    // const product = action.payload.product_id
    
    console.log('Previous State:', state);
    console.log('Action Received:', action);
    switch (action.type) {
        case "ADD_ITEM":
            const exist = state.find((x) => x.product_id === product.product_id);
            // const exist = state.find((x) => x.product_id === action.payload.product_id);
            if (exist) {  
                return state.map((x) =>
                    x.product_id === product.product_id ? { ...x, quantity: x.quantity + 1
                        // (product.quantity || 1) 

                    } : x
                    // x.product_id === action.payload.product_id ? { ...x, quantity: x.quantity + (action.payload.quantity || 1) } : x
                );
            } else {
                console.log('reducer product:', action.payload.product_id);

                return [...state, { ...product, quantity: product.quantity}];
                // return [...state, { ...action.payload.product_id, quantity: action.payload.quantity || 1}];
            }

        case "REMOVE_ITEM":
            
            // return state.filter((x) => x.id !== action.payload);
            return state.filter((x) => x.product_id !== action.payload);

            case "INCREMENT_ITEM":
                console.log("Reducer received action:", action);
                return state.map((x) =>
                    x.product_id === action.payload.product_id 
                        ? { ...x, quantity: x.quantity+1 } : x
                );

        // case "INCREMENT_ITEM":
        //     console.log("Reducer received action:", action);
        //     return state.map((x) =>
        //         // x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x
        //     x.prouduct_id === action.payload.product_id ? { ...x, quantity: x.quantity + action.payload.quantity  } : x
        //     );




        // case "DECREMENT_ITEM":
        //     console.log("Reducer received action:", action);
        //     return state.map((x) => {
        //         if (x.product_id === action.payload.product_id) {
        //             const newQuantity = x.quantity - 1; 
        //             return newQuantity > 0 
        //                 ? { ...x, quantity: newQuantity } 
        //                 : null; 
        //         }
        //         return x;
        //     }).filter((x) => x !== null);

        case "DECREMENT_ITEM":
            console.log("Reducer received action:", action);
            if (action.payload.quantity  === 1) {
               
                // return state.filter((x) => x.id !== product.id);
                return state.filter((x) => x.product_id !== action.payload.product_id);
            } else {
               
                return state.map((x) =>
                    // x.id === product.id ? { ...x, quantity: x.quantity - 1 } : x
                x.product_id === action.payload.product_id  ? { ...x, quantity: x.quantity - 1  } : x
                );
            }

        default:
            return state;
    }
};

export default CartQuantity;

