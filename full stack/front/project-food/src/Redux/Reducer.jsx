
// const cart = [];

// const CartQuantity = (state = cart, action) => {
//     const product = action.payload;
//     switch (action.type) {
//         case "ADD_ITEM":
//             return [
//                 ...state,
//                 { ...product, quantity: 1 } // Add the new product with quantity 1
//             ];

//         case "UPDATE_ITEM":
//             return state.map((item) =>
//                 item.product_id === product.product_id
//                     ? { ...item, quantity: product.quantity } // Update product quantity
//                     : item
//             );

//         case "REMOVE_ITEM":
//             return state.filter((item) => item.product_id !== product.product_id); // Remove product entirely

//         default:
//             return state;
//     }
// };
// export default CartQuantity;















const cart = [];

const CartQuantity = (state = cart, action) => {
    const product = action.payload;

    switch (action.type) {
        case "ADD_ITEM":
            const exist = state.find((x) => x.product_id === product.product_id);
            if (exist) {
                return state.map((x) =>
                    x.product_id === product.product_id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                return [...state, { ...product, quantity: 1 }];
            }

        case "REMOVE_ITEM":
            const exist1 = state.find((x) => x.product_id === product);
            if (exist1.quantity === 1) {
                return state.filter((x) => x.product_id !== exist1.product_id);
            } else {
                return state.map((x) =>
                    x.product_id === product ? { ...x, quantity: x.quantity - 1 } : x
                );
            }
            return state;

        default:
            return state;
    }
};

export default CartQuantity;





//i use this >>//////////////////////////////////////////
// const cart=[];

// const CartQuantity=(state=cart,action)=>{

//     const product=action.payload;
//     switch(action.type){
//         case "ADD_ITEM" :
//             const exist= state.find((x) => x.id ===product.id);
//             if(exist){
//                 return state.map((x)=>x.id ===product.id ? {...x,qty:x.qty+1}  :x );
//            } else {
//                 const product=action.payload;
//                 return[
//                     ...state,
//                     {
//                         ...product,
//                         qty:1}
//                     ]
//                 }
                  
//             break;

//         case "REMOVE_ITEM" :
//              const exist1= state.find((x) => x.id ===product.id);
//              if(exist1.qty===1){
//                  return state.filter((x)=>x.id !==exist1.id);

//                  }
//              else{
//                  return state.map((x)=>x.id ===product.id?{...x,qty:x.qty-1}  :x );

//                  }
//             break;

//         default:
//             return state
//             break;
         
//         };
//     }


// export default CartQuantity;
////////////////////////////////////////////////////////////////////////////////////////////




















//
// const INITIAL_VALUE = {
//     cart: {
//         items: {},
//     },
// };
//
// export default function ReducerCart(state = INITIAL_VALUE.cart, action) {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.id]: {
//                         quantity: (state.items[action.payload.id]?.quantity || 0) + 1,
//                     },
//                 },
//             };
//
//         case 'REMOVE_FROM_CART':
//             const newItems = { ...state.items };
//             delete newItems[action.payload.id]; // Remove the product from the cart
//             return {
//                 ...state,
//                 items: newItems,
//             };
//
//         case 'UPDATE_QUANTITY':
//             // If the new quantity is zero, remove the item from the cart
//             if (action.payload.quantity === 0) {
//                 const updatedItems = { ...state.items };
//                 delete updatedItems[action.payload.id];
//                 return {
//                     ...state,
//                     items: updatedItems,
//                 };
//             }
//             return {
//                 ...state,
//                 items: {
//                     ...state.items,
//                     [action.payload.id]: {
//                         quantity: action.payload.quantity,
//                     },
//                 },
//             };
//
//         default:
//             return state;
//     }
// }
//
//
//
//
//
// //
// // const INITIAL_VALUE={
// // //     quantity:0
// // cart: {
// //         items: {},
// //
// //     },
// //     };
// //
// // export default function ReducerCart(state=INITIAL_VALUE.cart,action){
// //     switch(action.type){
// //         case 'UPDATE_QUANTITY':
// //             return {
// //                 ...state,
// //                 quantity:action.payload
// //                 }
// ///////////////////////////////////////////////////////////////////////////////////////////////
// //         case 'ADD_TO_CART':
// //             return {
// //                 ...state,
// //                 items: {
// //                     ...state.items,
// //                     [action.payload.id]: {
// //                         quantity: (state.items[action.payload.id]?.quantity || 0) + 1,
// //                         // other product details if needed
// //                     },
// //                 },
// //             };
// //         case 'REMOVE_FROM_CART':
// //             const newItems = { ...state.items };
// //             delete newItems[action.payload.id]; // Remove the product from the cart
// //             return {
// //                 ...state,
// //                 items: newItems,
// //             };
// //         default:
// //             return state
// //         }
// //
// //
// //     }