

import axios from "axios";

export const addToCart = (product) => {
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
                payload: response.data, 
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

export const removeFromCart = (itemId) => {
    return async (dispatch) => {
        try {
            console.log('delete',itemId);  
            //, { data: { id: itemId } }
            //${itemId}
            // axios.delete(`http://127.0.0.1:8080/api/cart-items/${cartItemId}`)
            await axios.delete(`http://127.0.0.1:8080/api/cart-items/`, { data: { id: itemId } });
            dispatch({
                type: "REMOVE_ITEM",
                payload: itemId, 
            });
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };
};










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

