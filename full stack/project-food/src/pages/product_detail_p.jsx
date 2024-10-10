import React, { useEffect, useState } from "react";
import Product_component from "../component/vendors/vendor";
import ProductDetailComponent from "../component/products/product_detail";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../ui/loader/Loader";
import apiInstance from "../utils/axios";
import { Button } from "react-bootstrap";
import formatCurrency from "../component/formatcurrency";

export default function ProductDetail_p() {
    // const [product, setproduct] = useState(null);
    // const [error, setError] = useState(false);
    // // const [error2, setError2] = useState(false);
    // const [Recommend, setRecommend] = useState([]);
    // const { id } = useParams();

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:8080/api/products/${id}/`)
    //         .then((res) => {
    //             console.log("API response:", res.data.products);
    //             setproduct(res.data.products);
    //         })
    //         .catch(() => {
    //             console.log("error", error);
    //             setError(true);
    //         });
    // }, [id]);
    // =================================================================
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [tags, setTags] = useState([]);

    const param = useParams();

    const fetchPost = async () => {
        const response = await apiInstance.get(
            `productapi/admin/detail/${param.slug}/`
        );
        setPost(response.data);

        const tagArray = response.data?.tags?.split(",");
        setTags(tagArray);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    // console.log(`3333`, post);
    if (!post) return <Loader />;
    // console.log(`333`, post);
    const {
        id,
        full_name,
        phone,
        title,
        description,
        governorate,
        price_per_unit,
        thumbnail,
        image1,
        image2,
        image3,
        image4,
        status,
        slug,
    } = post;

    return (
        <>
            <div className="d-flex m-5 bg-light">
                <div>
                    {/* {image && ( */}
                    <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                        {/* {console.log(image)} */}
                        <img
                            src={`${thumbnail}`}
                            alt={`${title}`}
                            className="w-100 h-auto rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                        {/* {console.log(image)} */}
                        <img
                            src={`${image1}`}
                            alt={`${title}`}
                            className="w-100 h-auto rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                        {/* {console.log(image)} */}
                        <img
                            src={`${image2}`}
                            alt={`${title}`}
                            className="w-100 h-auto rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                        {/* {console.log(image)} */}
                        <img
                            src={`${image3}`}
                            alt={`${title}`}
                            className="w-100 h-auto rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <div className="mb-2 border rounded shadow  m-5 p-3 bg-white">
                        {/* {console.log(image)} */}
                        <img
                            src={`${image4}`}
                            alt={`${title}`}
                            className="w-100 h-auto rounded"
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
                <div className="m-5">
                    <div>
                        <h2>{full_name}</h2>
                        <h2>{phone}</h2>
                    </div>
                    <div>
                        <p className="fs-5">{title}</p>
                        <p className="fs-5">{description}</p>
                    </div>
                    <div>
                        Price:
                        <span className="fs-5 text-danger">
                            {formatCurrency(price_per_unit)}
                        </span>
                    </div>
                    <div className="mt-auto">
                        {/* {quantity === 0 ? ( */}
                        <Button
                            variant="outline-warning"
                            className="rounded-5 m-2 w-100 "
                            // onClick={inc_Quantity}
                            // onClick={onAddToCart}
                        >
                            Add to cart
                        </Button>
                        {/* ) : ( */}
                        <div>
                            <div className="d-flex align-items-center justify-content-center">
                                <Button
                                    variant="outline-warning"
                                    className="rounded-circle"
                                    // onClick={inc_Quantity}
                                    // onClick={onAddToCart}
                                >
                                    +
                                </Button>
                                {/* <span>{quantity} in cart</span> */}
                                <Button
                                    variant="outline-warning"
                                    className="rounded-circle "
                                    // onClick={dec_Quantity}
                                    // onClick={onRemoveFromCart}
                                >
                                    -
                                </Button>
                            </div>
                            <Button
                                variant="outline-warning"
                                className="rounded-5 m-2 w-100 "
                                //   onClick={remove_Quantity}
                                // onClick={onRemoveFromCart}
                            >
                                Remove
                            </Button>
                        </div>
                        {/* )} */}
                    </div>
                </div>
            </div>

            {/* <React.Fragment>
                {error ? (
                    <div>Error loading product details</div>
                ) : !product ? (
                    <div>Loading...</div>
                ) : (
                    <ProductDetailComponent key={product.id} {...product} />
                )}
            </React.Fragment> */}
        </>
    );
}
