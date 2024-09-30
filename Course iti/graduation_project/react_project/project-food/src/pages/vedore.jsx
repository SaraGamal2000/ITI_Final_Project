import React ,{useState,useEffect}from "react";
import axios from "axios";
import Product_component from '../component/vendors/vendor';


function Vendor_p(){
    const [products,setproducts] = useState([]);
    const [cart,setcart]=useState([]);
    const [error, setError] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8080/product_api/products/')
            .then((res)=>{
                console.log(res.data)
               setproducts(res.data)
        })
            .catch(() => {
            setError(true);
          })

        },[]);

 useEffect(()=>{
        axios.get('http://localhost:8080/cart_api/carts/?format=json')
            .then((res)=>{
                console.log('cart data',res.data)
               setcart(res.data)
        })
            .catch(() => {
            setError(true);
          })

        },[]);


// http://localhost:8080/cart_api/carts/?format=json
    return(
        <>
        <h1>page of vendors</h1>
         <div
          className=" container bg-light "
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1px",
          }}>
      {products.map((product) => (
                    <Product_component key={product.id} {...product} />
                ))}
      </div>
        </>
    )

}
export default Vendor_p;