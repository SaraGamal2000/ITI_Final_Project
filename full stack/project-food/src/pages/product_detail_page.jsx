import React, { useEffect, useState } from "react";
import Product_component from "../component/vendors/vendor";
import ProductDetailComponent from "../component/products/product_detail";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail_p() {
  const [product, setproduct] = useState(null);
  const [error, setError] = useState(false);
  // const [error2, setError2] = useState(false);
  const [Recommend, setRecommend] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}/`)
      .then((res) => {
        console.log("API response:", res.data.products);
        setproduct(res.data.products);
      })
      .catch(() => {
          console.log('error',error)
        setError(true);
      });
  }, [id]);

  return (
    <>
       <React.Fragment>
      {error ? (
        <div>Error loading product details</div>
      ) : !product ? (
        <div>Loading...</div>
      ) : (
        <ProductDetailComponent key={product.id} {...product} />
      )}
    </React.Fragment>
    </>
  );
}