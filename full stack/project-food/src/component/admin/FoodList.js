import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import api from "../../utils/api"; // Axios instance
import Swal from "sweetalert2";
import { App_Admin } from "../../utils/constants";
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import Loader from "../../ui/loader/Loader";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = () => {
        api.get("/productapi/lists/")
            .then((res) => setFoods(res.data))
            .catch((err) => console.error(err));
    };

    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    api.delete(`foods/${id}/`)
                        .then(() => {
                            fetchFoods();
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "The food has been deleted.",
                                "success"
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            swalWithBootstrapButtons.fire(
                                "Error!",
                                "There was an issue deleting the food.",
                                "error"
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "The food is safe :)",
                        "error"
                    );
                }
            });
    };

    const handleEdit = (id) => {
        // Navigate to edit page with the food ID
        navigate(`/edit-food/${id}`);
    };
    // =================================================================

    // =================================================================
    // const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const userId = useUserData()?.user_id;
    const accessToken = Cookies.get("access_token");

    const fetchPosts = async () => {
        try {
            const response = await apiInstance.get(
                `productapi/admin/lists/`
                //     , {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`,
                //     },
                // }
            );
            setPosts(response.data);
            // console.log(`response.data>-`, response.data);
        } catch (error) {
            console.log(`${error}`);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    if (!posts) return <Loader />;
    console.log(posts);

    return (
        <div>
            <h2>Food List</h2>
            <hr />

            {/* Add New Food Button */}
            <Link to={`/${App_Admin}/createregisterorder`}>
                <button
                    style={{
                        padding: "10px 15px",
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        border: "none",
                    }}
                >
                    Add New Food
                </button>
            </Link>

            <hr />

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Food Name
                        </th>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Price
                        </th>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Full Name
                        </th>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Phone
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((food) => (
                        <tr key={food.id}>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food?.title}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food?.price_per_unit}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food?.full_name}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food?.phone}
                            </td>
                            {/* <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleEdit(food.id)} // Navigate to edit page
                                    style={{
                                        marginRight: "8px",
                                        padding: "5px 8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor: "green",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "20px",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(food.id)}
                                    style={{
                                        padding: "5px 8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "20px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td> */}
                        </tr>
                    ))}
                    {/*  
                    {foods.map((food) => (
                        <tr key={food.id}>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food.name}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food.price}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {food.type}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleEdit(food.id)} // Navigate to edit page
                                    style={{
                                        marginRight: "8px",
                                        padding: "5px 8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor: "green",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "20px",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(food.id)}
                                    style={{
                                        padding: "5px 8px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "20px",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}*/}
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;

//import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';  // Import Link from react-router-dom
//import api from '../api';  // Axios instance
//import Swal from 'sweetalert2';
//
//const FoodList = () => {
//    const [foods, setFoods] = useState([]);
//
//    useEffect(() => {
//        fetchFoods();
//    }, []);
//
//    const fetchFoods = () => {
//        api.get('foods/')
//            .then(res => setFoods(res.data))
//            .catch(err => console.error(err));
//    };
//
//    const handleDelete = (id) => {
//        const swalWithBootstrapButtons = Swal.mixin({
//            customClass: {
//                confirmButton: 'btn btn-success',
//                cancelButton: 'btn btn-danger'
//            },
//            buttonsStyling: false
//        });
//
//        swalWithBootstrapButtons.fire({
//            title: 'Are you sure?',
//            text: "You won't be able to revert this!",
//            icon: 'warning',
//            showCancelButton: true,
//            confirmButtonText: 'Yes, delete it!',
//            cancelButtonText: 'No, cancel!',
//            reverseButtons: true
//        }).then((result) => {
//            if (result.isConfirmed) {
//                api.delete(`foods/${id}/`)
//                    .then(() => {
//                        fetchFoods();
//                        swalWithBootstrapButtons.fire('Deleted!', 'The food has been deleted.', 'success');
//                    })
//                    .catch(err => {
//                        console.error(err);
//                        swalWithBootstrapButtons.fire('Error!', 'There was an issue deleting the food.', 'error');
//                    });
//            } else if (result.dismiss === Swal.DismissReason.cancel) {
//                swalWithBootstrapButtons.fire('Cancelled', 'The food is safe :)', 'error');
//            }
//        });
//    };
//
//    return (
//        <div>
//            <h2>Food List</h2>
//            <hr />
//
//            {/* Add New Food Button */}
//            <Link to="/add-food">
//                <button style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', borderRadius: '5px', border: 'none' }}>
//                    Add New Food
//                </button>
//            </Link>
//
//            <hr />
//
//            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//                <thead>
//                    <tr>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Food Name</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Price</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Type</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {foods.map((food) => (
//                        <tr key={food.id}>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.name}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.price}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.type}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', textAlign: 'center' }}>
//                                <button
//                                    style={{ marginRight: '8px', padding: '5px 8px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '20px' }}
//                                >
//                                    Edit
//                                </button>
//                                <button
//                                    onClick={() => handleDelete(food.id)}
//                                    style={{ padding: '5px 8px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '20px' }}
//                                >
//                                    Delete
//                                </button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};
//
//export default FoodList;

//import React, { useState, useEffect } from 'react';
//import api from '../api';
//import Swal from 'sweetalert2';
//
//const FoodList = () => {
//    const [foods, setFoods] = useState([]);
//    const [formData, setFormData] = useState({ name: '',price: '', type: '',description: '', category: ''});
//    const [editMode, setEditMode] = useState(false);
//    const [currentId, setCurrentId] = useState(null);
//
//
//    useEffect(() => {
//        fetchFoods();
//    }, []);
//
//    const fetchFoods = () => {
//        api.get('foods/')
//            .then(res => setFoods(res.data))
//            .catch(err => console.error(err));
//    };
//
//    const handleAddNew = () => {
//        setFormData({ name: '', price: '', type: '' ,description: '', category: ''});
//        setEditMode(false);
//    };
//
//    const handleEdit = (food) => {
//        setFormData(food);
//        setCurrentId(food.id);
//        setEditMode(true);
//    };
//
//  const handleDelete = (id) => {
//  const swalWithBootstrapButtons = Swal.mixin({
//    customClass: {
//      confirmButton: 'btn btn-success',
//      cancelButton: 'btn btn-danger'
//    },
//    buttonsStyling: false
//  });
//
//
//  swalWithBootstrapButtons.fire({
//    title: 'Are you sure?',
//    text: "You won't be able to revert this!",
//    icon: 'warning',
//    showCancelButton: true,
//    confirmButtonText: 'Yes, delete it!',
//    cancelButtonText: 'No, cancel!',
//    reverseButtons: true
//  }).then((result) => {
//    if (result.isConfirmed) {
//      api.delete(`foods/${id}/`)
//        .then(() => {
//          fetchFoods();
//
//
//          swalWithBootstrapButtons.fire(
//            'Deleted!',
//            'The food has been deleted.',
//            'success'
//          );
//        })
//        .catch(err => {
//          console.error(err);
//
//          swalWithBootstrapButtons.fire(
//            'Error!',
//            'There was an issue deleting the food.',
//            'error'
//          );
//        });
//    } else if (result.dismiss === Swal.DismissReason.cancel) {
//
//      swalWithBootstrapButtons.fire(
//        'Cancelled',
//        'The food is safe :)',
//        'error'
//      );
//    }
//  });
//};
//
//    const handleSubmit = (e) => {
//        e.preventDefault();
//
//        console.log('Form data:', formData);
//
//        if (editMode) {
//            api.put(`foods/${currentId}/`, formData)
//                .then(() => {
//                    fetchFoods();
//                    setFormData({ name: '', price: '', type: '',description: '', category: '' });
//                    setEditMode(false);
//                })
//                .catch(err => console.error(err));
//        } else {
//
//            api.post('foods/', formData)
//                .then(() => {
//                    fetchFoods();
//                    setFormData({ name: '', price: '', type: '',description: '', category: ''});
//                })
//                .catch(err => {
//                    console.error('Error posting data:', err);
//                    console.error(err.response?.data);
//                });
//        }
//    }
//
//    const [categories, setCategories] = useState([]);
//
//            useEffect(() => {
//                api.get('categories/')
//                    .then(res => setCategories(res.data))
//                    .catch(err => console.error('Error fetching categories:', err));
//                }, []);
//
//
//    const handleChange = (e) => {
//        setFormData({
//            ...formData,
//            [e.target.name]: e.target.value,
//        });
//    };
//    return (
//        <div>
//            <h2>Food List</h2>
//            <hr/>
//            <form onSubmit={handleSubmit}>
//                <input style={{width: '90%',padding:'5px'}}
//                    type="text"
//                    name="name"
//                    placeholder="Food Name"
//                    value={formData.name}
//                    onChange={handleChange}
//                    required
//                /><br/><br/>
//                 <textarea
//                    name="description"
//                    placeholder="Description"
//                    value={formData.description}
//                    onChange={handleChange}
//                    style={{width:'90%'}}
//                    required
//                /><br/><br/>
//
//                <input style={{width: '90%',padding:'5px'}}
//                    type="number"
//                    name="price"
//                    placeholder="Price"
//                    value={formData.price}
//                    onChange={handleChange}
//                    required
//                /><br/><br/>
//                <input style={{width: '90%',padding:'5px'}}
//                    type="text"
//                    name="type"
//                    placeholder="Type"
//                    value={formData.type}
//                    onChange={handleChange}
//                    required
//                /><br/><br/>
//                 <select  name="category" value={formData.category} onChange={handleChange} style={{width:'90%'}}required>
//                    <option value="">Select Category</option>
//                    {categories.map(category => (
//                        <option key={category.id} value={category.id}>{category.name}</option>
//                    ))}
//                </select>
//
//
//                <br/><br/>
//
//                <button type="submit" style={{ padding: '5px', marginTop: '10px',backgroundColor:'orange',color:'white',fontWeight:'bold' ,border:'none',borderRadius:'20px'}}>
//                    {editMode ? 'Update Food' : 'Add Food'}
//                </button>
//            </form>
//            <hr/>
//
//            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//                <thead>
//                    <tr>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold',fontSize:'22px' }}>Food Name</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' ,fontSize:'22px'}}>Price</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold',fontSize:'22px' }}>Type</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold',fontSize:'22px' }}>Actions</th>
//                    </tr>
//                </thead>
//                <tbody>
//                    {foods.map((food) => (
//                        <tr key={food.id}>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.name}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.price}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{food.type}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', textAlign: 'center' }}>
//                                <button
//                                    onClick={() => handleEdit(food)}
//                                    style={{ marginRight: '8px', padding: '5px 8px', cursor: 'pointer', fontWeight: 'bold',backgroundColor:'green',color:'white',border:'none',borderRadius:'20px' }}
//                                >
//                                    Edit
//                                </button>
//                                <button
//                                    onClick={() => handleDelete(food.id)}
//                                    style={{ padding: '5px 8px', cursor: 'pointer', fontWeight: 'bold' ,backgroundColor:'red',color:'white',border:'none',borderRadius:'20px'}}
//                                >
//                                    Delete
//                                </button>
//                            </td>
//                        </tr>
//                    ))}
//                </tbody>
//            </table>
//        </div>
//    );
//};
//
//export default FoodList;
//
//
//
//
//
//
//
//
//
//
