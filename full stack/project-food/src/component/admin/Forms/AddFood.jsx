import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams to detect if we're editing
import api from '../../../utils/api';  // Axios instance

const AddFood = () => {
    const { id } = useParams();  // Get the id from the URL params, if it exists
    const [formData, setFormData] = useState({ name: '', price: '', type: '', description: '', category: '' });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch categories for the dropdown
        api.get('categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.error('Error fetching categories:', err));

        // If there's an ID, fetch the food data for editing
        if (id) {
            api.get(`foods/${id}/`)
                .then(res => setFormData(res.data))
                .catch(err => console.error('Error fetching food:', err));
        }
    }, [id]);  // Run this effect only when the component mounts or when the ID changes

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent full page reload

        if (id) {
            // Update existing food
            api.put(`foods/${id}/`, formData)
                .then(() => {
                    alert('Food updated successfully!');
                    navigate('/');  // Navigate back to the food list
                })
                .catch(err => {
                    console.error('Error updating food:', err);
                });
        } else {
            // Add new food
            api.post('foods/', formData)
                .then(() => {
                    setFormData({ name: '', price: '', type: '', description: '', category: '' });
                    alert('Food added successfully!');
                    navigate('/');
                })
                .catch(err => {
                    console.error('Error posting data:', err);
                });
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Food' : 'Add New Food'}</h2>
            <form onSubmit={handleSubmit}>
                <input style={{width: '90%',padding:'5px'}}
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /><br/><br/>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{width:'90%'}}
                    required
                /><br/><br/>
                <input style={{width: '90%',padding:'5px'}}
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                /><br/><br/>
                <input style={{width: '90%',padding:'5px'}}
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                /><br/><br/>
                <select name="category" value={formData.category} onChange={handleChange} style={{width:'90%'}} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <br/><br/>
                <button type="submit" style={{ padding: '5px', marginTop: '10px', backgroundColor:'orange',color:'white',fontWeight:'bold', border:'none',borderRadius:'20px' }}>
                    {id ? 'Update Food' : 'Add Food'}
                </button>
            </form>
        </div>
    );
};

export default AddFood;




//import React, { useState, useEffect } from 'react';
//import api from '../../api';  // Axios instance
//import { useNavigate } from 'react-router-dom';
//
//
//const AddFood = () => {
//    const [formData, setFormData] = useState({ name: '', price: '', type: '', description: '', category: '' });
//    const [categories, setCategories] = useState([]);
//    const navigate = useNavigate();
//
//    // Fetch categories to populate the dropdown
//    useEffect(() => {
//        api.get('categories/')
//            .then(res => setCategories(res.data))
//            .catch(err => console.error('Error fetching categories:', err));
//    }, []);
//
//    const handleChange = (e) => {
//        setFormData({
//            ...formData,
//            [e.target.name]: e.target.value,
//        });
//    };
//
//    const handleSubmit = (e) => {
//        e.preventDefault();  // Prevent full page reload
//
//        // Add new food
//        api.post('foods/', formData)
//            .then(() => {
//                // Redirect back to food list or clear the form
//                setFormData({ name: '', price: '', type: '', description: '', category: '' });
//                alert('Food added successfully!');
//                navigate('/');
//            })
//            .catch(err => {
//                console.error('Error posting data:', err);
//                console.error(err.response?.data);  // Check the server's error response
//            });
//    };
//
//    return (
//        <div>
//            <h2>Add New Food</h2>
//            <form onSubmit={handleSubmit}>
//                <input style={{width: '90%',padding:'5px'}}
//                    type="text"
//                    name="name"
//                    placeholder="Food Name"
//                    value={formData.name}
//                    onChange={handleChange}
//                    required
//                /><br/><br/>
//                <textarea
//                    name="description"
//                    placeholder="Description"
//                    value={formData.description}
//                    onChange={handleChange}
//                    style={{width:'90%'}}
//                    required
//                /><br/><br/>
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
//                <select name="category" value={formData.category} onChange={handleChange} style={{width:'90%'}} required>
//                    <option value="">Select Category</option>
//                    {categories.map(category => (
//                        <option key={category.id} value={category.id}>{category.name}</option>
//                    ))}
//                </select>
//                <br/><br/>
//                <button type="submit" style={{ padding: '5px', marginTop: '10px', backgroundColor:'orange',color:'white',fontWeight:'bold', border:'none',borderRadius:'20px' }}>
//                    Add Food
//                </button>
//            </form>
//        </div>
//    );
//};
//
//export default AddFood;
