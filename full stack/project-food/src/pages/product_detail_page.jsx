import React, { useEffect, useState } from "react";
import Product_component from "../component/vendors/vendor";
import ProductDetailComponent from "../component/products/product_detail";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../ui/loader/Loader";

export default function ProductDetail_p() {
    // const [product, setproduct] = useState(null);
    // const [error, setError] = useState(false);
    // // const [error2, setError2] = useState(false);
    // const [Recommend, setRecommend] = useState([]);
    // const { id } = useParams();

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8000/api/products/${id}/`)
    //         .then((res) => {
    //             console.log("API response:", res.data.products);
    //             setproduct(res.data.products);
    //         })
    //         .catch(() => {
    //             console.log("error", error);
    //             setError(true);
    //         });
    // }, [id]);
    // =============================================================================
    const { slug } = useParams();
    const [product, setproduct] = useState(null);
    const [error, setError] = useState(false);
    const [Recommend, setRecommend] = useState([]);

    useEffect(() => {
        try {
            axios
                .get(
                    `http://127.0.0.1:8000/api/v1/productapi/admin/detail/${slug}/`
                )
                .then((res) => {
                    console.log(res.data);
                    setproduct(res.data);
                    // console.log("API response:", res.data.products);
                });
        } catch (error) {
            console.log(`Error`);
        }
    }, [slug]);

    if (!product) return <Loader />;
    // console.log(`www`, product);

    return (
        <>
            <React.Fragment>
                <ProductDetailComponent product={product} />

                {/* {error ? (
                    <div>Error loading product details</div>
                ) : !product ? (
                    <div>Loading...</div>
                ) : (
                    // <ProductDetailComponent key={product.id} {...product} />
                    <ProductDetailComponent product={product} />
                )} */}
            </React.Fragment>
        </>
    );
}
