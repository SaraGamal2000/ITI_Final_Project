// try {
        //     const cartItem = {
        //         cart_id: 1, // Assuming a static cart ID for now; this can be dynamically retrieved
        //         // product: product.id, // Refers to the product ID
        //         // quantity: 1, // Default quantity set to 1
        //         // price: parseFloat(product.price),
        //         // product_name:product.name,
        //         // product_image:product.image,
        //         product_id: productId,
        //         quantity: quantity
        //     };
        //     //${product.id}/

        //     // Check if the item already exists in the cart (backend handles this)
        //     const response = await axios.post('http://127.0.0.1:8080/api/cart-items/', cartItem);



import axios from 'axios';

// Action to add an item to the cart
export const addToCart = (product,productId, quantity) => {
    console.log('Adding to cart:', product);
    
    return async (dispatch) => {
        
        try {
                        const cartItem = {
                            cart_id: 1, // You may want to retrieve the user's cart ID dynamically
                            product_id: product.id, 
                            quantity: 1,            
                            price: parseFloat(product.price), 
                        };
                       
                        const response = await axios.post('http://127.0.0.1:8080/api/cart-items/', cartItem); 
            
            dispatch({
                type: "ADD_ITEM",
                payload: response.data, // Response will contain the updated cart item
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

// Action to remove an item from the cart
export const removeFromCart = (itemId) => {
    return async (dispatch) => {
        try {
            // Send DELETE request to remove the item from the cart
            await axios.delete(`http://127.0.0.1:8080/api/cart-items/${itemId}/`);
            
            dispatch({
                type: "REMOVE_ITEM",
                payload: itemId, // Use itemId to remove it from the state
            });
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };
};

// Action to update the quantity of an item in the cart (PUT request)
export const updateCartItemQuantity = (itemId, action) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8080/api/cart-items/${itemId}/`, {
                action: action, // Pass 'increment' or 'decrement' action based on user interaction
            });

            dispatch({
                type: action === 'increment' ? "INCREMENT_ITEM" : "DECREMENT_ITEM",
                payload: response.data, // Updated cart item with new quantity
            });
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };
};




///this code work to add product as new row only//////////////////////////////////////////////////////
// import axios from "axios";

// export const addToCart = (product) => {
//     return async (dispatch) => {
//         try {
//             const cartItem = {
//                 cart_id: 1, // You may want to retrieve the user's cart ID dynamically
//                 product_id: product.id, 
//                 quantity: 1,            
//                 price: parseFloat(product.price), 
//             };
           
//             const response = await axios.post('http://127.0.0.1:8080/api/cart-items/', cartItem); 
//             dispatch({
//                 type: "ADD_ITEM",
//                 payload: response.data, 
//             });
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     };
// };

// export const removeFromCart = (itemId) => {
//     return async (dispatch) => {
//         try {
//             console.log('delete',itemId);  
//             //, { data: { id: itemId } }
//             //${itemId}
//             // axios.delete(`http://127.0.0.1:8080/api/cart-items/${cartItemId}`)
//             await axios.delete(`http://127.0.0.1:8080/api/cart-items/${itemId}/`, { data: { id: itemId } });
//             dispatch({
//                 type: "REMOVE_ITEM",
//                 payload: itemId, 
//             });
//         } catch (error) {
//             console.error("Error removing from cart:", error);
//         }
//     };
// };










/////////////////////////////////////////////////////////////////////////
// import axios from "axios";
// export const addToCart = (product) => {
//     return async (dispatch) => {
//         try {
//             const cartItem = {
//                 cart_id: 1,
//                 product_id: product.id, 
//                 quantity: 1,            
//                 price: parseFloat(product.price), 
//             };
           
//             console.log("Sending product to add to cart:", cartItem); 
//             const response = await axios.post('http://127.0.0.1:8080/api/cart-items/',cartItem); 
//             dispatch({
//                 type: "ADD_ITEM",
//                 payload: response.data, 
//             });
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     };
// };


// export const removeFromCart = (productId) => {
//     return async (dispatch) => {
//         try {
            
//             await axios.delete(`http://127.0.0.1:8080/api/cart-items/${productId}`);
//             dispatch({
//                 type: "REMOVE_ITEM",
//                 payload: productId, 
//             });
//         } catch (error) {
//             console.error("Error removing from cart:", error);
//         }
//     };
// };

/////////////////////////////////////////////////////////////////////////////
// export const addToCart = (product) => {
//     return {
//         type: "ADD_ITEM",
//         payload: product,
//     };
// };
// // import axios from "axios";

// export const removeFromCart = (product) => {
//     return {
//         type: "REMOVE_ITEM",
//         payload: product,
//     };
// };
////////////////////////////////////////////////////////////////////////////////////////////
// // export const ADD_ITEM = "ADD_ITEM";
// export const addToCart = (product) => async (dispatch) => {
//     // Update the Redux store
//     dispatch({
//       type: "ADD_ITEM",
//       payload: product,
//     });
  
//     // Send API request to persist the cart in the backend
//     try {
//       await axios.post('http://127.0.0.1:8080/api/cart-items/', {
//         product_id: product.id,
//         quantity: 1, // Default to 1, or handle based on existing quantity
//       });
//     } catch (error) {
//       console.error('Error adding to cart in the backend:', error);
//     }
//   };

