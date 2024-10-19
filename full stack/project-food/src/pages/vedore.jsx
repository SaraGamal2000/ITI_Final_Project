import React, { useState, useEffect } from "react";
import axios from "axios";
import Product_component from "../component/vendors/vendor";
import { Col, Row } from "react-bootstrap";

function Vendor_p() {
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    //         axios.get('http://localhost:8080/product_api/products/')
    axios
      .get("http://localhost:8080/api/products/")
      .then((res) => {
        console.log(res.data.products);
        setproducts(res.data.products);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  //  useEffect(()=>{
  //         axios.get('http://localhost:8080/cart_api/carts/?format=json')
  //             .then((res)=>{
  //                 console.log('cart data',res.data)
  //                setcart(res.data)
  //         })
  //             .catch(() => {
  //             setError(true);
  //           })
  //
  //         },[]);

  // http://localhost:8080/cart_api/carts/?format=json
  return (
    <>
    <Row className="g-5 w-100 align-items-center m-2">
      {products.map((product) => (
        <Col key={product.id} md={3} xs={6} lg={3}>
          <Product_component {...product} />
        </Col>
      ))}
    </Row>
  </>
  );
}
export default Vendor_p;
