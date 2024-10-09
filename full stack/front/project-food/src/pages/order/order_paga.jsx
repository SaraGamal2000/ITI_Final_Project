
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Order_p() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  // Store the token once. Ideally, this should be done after logging in.
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Nzc2OTM4LCJpYXQiOjE3Mjg0ODA5MzgsImp0aSI6IjZlZTM5ZjNlNDE0ODRiMDI4YzAxYzM0ODE1YzlhNjU4IiwidXNlcl9pZCI6MX0.zYgwQ3L7FrXI0CYyELbke9-DuAqa6KAnQd_vkCdwomk";
  localStorage.setItem("accessToken", token);

  useEffect(() => {
    const createOrder = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("accessToken");

      // Ensure that token exists before making the request
      if (!token) {
        console.error("No access token found");
        setError(true);
        return;
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/api/create-order/`, // Make sure to use backticks for template strings
          {
            // This is the data being sent in the body of the request
            cart_id: 1,
            address: "123 Main Street, City",
            payment_status: "pending",
          },
          {
            // This is where you add the headers
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        console.log("API response:", response.data);
        setProduct(response.data.products);
      } catch (error) {
        console.log(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setError(true);
      }
    };

    createOrder();
  }, []);

  return (
    <>
      <React.Fragment>
        {error && <h1 className="m-5 text-center">there are  "error"</h1>}
    {product && <h1 className="m-5">success</h1>}{" "}
      </React.Fragment>
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { useParams } from "react-router-dom";

// export default function Order_p() {
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(false);
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Nzc2OTM4LCJpYXQiOjE3Mjg0ODA5MzgsImp0aSI6IjZlZTM5ZjNlNDE0ODRiMDI4YzAxYzM0ODE1YzlhNjU4IiwidXNlcl9pZCI6MX0.zYgwQ3L7FrXI0CYyELbke9-DuAqa6KAnQd_vkCdwomk";
//   localStorage.setItem("accessToken", token); 
//   // const token = localStorage.getItem("accessToken",);
//   useEffect(() => {
//     const createOrder = async () => {
//       const token = localStorage.getItem("accessToken");
//       try {
//         const response = await axios.post(
//           `http://localhost:8080/api/create-order/`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//               "Content-Type": "application/json",
//             },
//             cart_id: 1,
//             address: "123 Main Street, City",
//             payment_status: "pending",
//           }
//         );

//         console.log("API response:", response.data);
//         setProduct(response.data.products);
//       } catch (error) {
//         console.log(
//           "Error:",
//           error.response ? error.response.data : error.message
//         );
//         setError(true);
//       }
//     };

//     createOrder();
//   }, []);

//   return (
//     <>
//       <React.Fragment>
//         {error && <h1>there are  "error"</h1>}
//         {product && <h1>success</h1>}{" "}
        
//       </React.Fragment>
//     </>
//   );
// }
