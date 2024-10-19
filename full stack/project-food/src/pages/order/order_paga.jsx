import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateOrder = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [cartItem,setcartItem]=useState([])
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect(()=>{
  //   const res_item = await axios.get(
  //     'http://127.0.0.1:8080/api/orders/${}', )

  // },[])
  const createOrder = async () => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMTA3NTY0LCJpYXQiOjE3Mjg4MTE1NjQsImp0aSI6IjY3MmFlNWIwMWEzZTRlNzk4NmI2YjYyODEyZTU3YjRiIiwidXNlcl9pZCI6MX0.lsTyEiBUSgmBc_e7SCvJTfeqZXBbpOGfvUFE1HgOHcg"
    );
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
   
      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/create/",
        {
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order created successfully:", response.data);

      if (response.data && response.data.order_id) {
        const res_item = await axios.get(
          `http://127.0.0.1:8000/api/orders/${response.data.order_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setOrderDetails(res_item.data);
        setSuccessMessage(
          "Your order has been placed successfully and will arrive within 48 hours!")
        
      }
      else {
        setError("Order ID not found");
      }
    } catch (error) {
      console.error(
        "Error creating order or fetching details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">please enter your address & payment_method</h2>
      {successMessage && (
        <div className="alert alert-success " role="alert">
          {successMessage}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label"> Address</label>
        <input
          type="text"
          className="form-control"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Payment Method</label>
        <input
          type="text"
          className="form-control"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </div>
      <button onClick={createOrder} className="btn btn-primary mb-5">
        Create Order
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      {orderDetails && (
        <div className="card">
          <div className="card-header">
            <h3>Order Details</h3>
          </div>
          <div className="card-body">
            <p>
              <strong>Order ID:</strong> {orderDetails.id}
            </p>
            <p>
              <strong>User ID:</strong> {orderDetails.user}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(orderDetails.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Total Price:</strong> ${orderDetails.total_price}
            </p>
            <p>
              <strong>Shipping Address:</strong> {orderDetails.shipping_address}
            </p>
            <p>
              <strong>Payment Method:</strong> {orderDetails.payment_method}
            </p>
            <p>
              <strong>Status:</strong> {orderDetails.status}
            </p>

            <h4 className="mt-4">your products</h4>
            <div className="row">
              {orderDetails.items && orderDetails.items.length > 0 ? (
                orderDetails.items.map((item, index) => (
                  <div className="col-md-4 " key={index}>
                    <div className="card mb-4 ">
                      <img
                        src={`http://localhost:8000${item.Product_image}`}
                        className="card-img-top"
                        alt={item.product_name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.product_name}</h5>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <p className="card-text">Price: ${item.price}</p>
                      </div>
                    </div>
                  </div>
                  // <div className="d-flex" key={index}>
                  //   <div className="rounded-5 d-flex">
                  //     <img
                  //       src={`http://localhost:8080${item.Product_image}`}
                  //       // className="card-img-top"
                  //       alt={item.product_name}
                  //       style={{ height: "100px" }}
                  //     />

                  //     <h5 className="bg-danger">{item.product_name}</h5>
                  //     <p className="card-text">Quantity: {item.quantity}</p>
                  //     <p className="card-text">Price: ${item.price}</p>
                  //   </div>
                  // </div>
                ))
              ) : (
                <p>No items in this order.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
 
};

export default CreateOrder;

