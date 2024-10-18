
import axios from 'axios';


export const addToCart = (product,productId, quantity) => {
    console.log('Adding to cart:', product);
    
    return async (dispatch) => {
        
        try {
                        const cartItem = {
                            cart_id: 1,
                            product_id: product.id, 
                            quantity: 0,         
                            price: parseFloat(product.price), 
                        };
                       
                        const response = await axios.post('http://127.0.0.1:8000/api/cart-items/', cartItem); 
                        console.log('Response from API:', response.data);

                        // if (Array.isArray(response.data) && response.data.length > 0) 
                        if (response.data && typeof response.data === 'object')
                            {
                         
                            dispatch({
                                type: "ADD_ITEM",
                                payload:response.data, 
                                
                            });
                            
                        } else {
                            console.error('Invalid response format:', response.data); 
                            dispatch({
                                type: "ADD_ITEM",
                                payload: [], 
                            });
                        }
                   
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};


export const removeFromCart = (product_id) => {
    return async (dispatch) => {
        try {
          
            await axios.delete(`http://127.0.0.1:8000/api/cart-items/${product_id}/`);
            
            dispatch({
                type: "REMOVE_ITEM",
                payload:product_id, 
            });
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };
};


export const updateCartItemQuantity = (product_id, action) => {
    return async (dispatch) => {
        try {
            console.log("Updating cart item with ID:", product_id);
            console.log("Action Payload:", action.payload);

            const response = await axios.put(`http://127.0.0.1:8000/api/cart-items/${product_id}/`, {
                action: action, 
            });


            console.log("API Response:", response.data);

            const payload = {
                product_id: response.data.product_id,
                quantity: response.data.quantity,
            };

            console.log("Payload of put:", payload);


            dispatch({
                // type: action === 'increment' ? "INCREMENT_ITEM" : "DECREMENT_ITEM",
                type: action === 'increment' ? "INCREMENT_ITEM" : "DECREMENT_ITEM",
                payload ,
              
            });
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };
};

