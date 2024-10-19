import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams for getting the category ID from the URL
import api from '../../../utils/api';  // Axios instance

const AddCategory = () => {
    const { id } = useParams();  // Get the category ID from the URL, if editing
    const [formData, setFormData] = useState({ name: '' });
    const navigate = useNavigate();  // For navigation

    useEffect(() => {
        // If there is an ID, fetch the existing category for editing
        if (id) {
            api.get(`categories/${id}/`)
                .then(res => setFormData({ name: res.data.name }))
                .catch(err => console.error('Error fetching category:', err));
        }
    }, [id]);  // Only run the effect when the ID changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // If there's an ID, we're editing, so send a PUT request
            api.put(`categories/${id}/`, formData)
                .then(() => {
                    alert('Category updated successfully!');
                    navigate('/');  // Navigate back to the category list after editing
                })
                .catch(err => console.error('Error updating category:', err));
        } else {
            // If there's no ID, we're adding a new category, so send a POST request
            api.post('categories/', formData)
                .then(() => {
                    setFormData({ name: '' });
                    alert('Category added successfully!');
                    navigate('/');  // Navigate back to the category list after adding
                })
                .catch(err => console.error('Error adding category:', err));
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Category' : 'Add New Category'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', width: '90%' }}
                />
                <br/><br/>
                <button type="submit" style={{ padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px',fontWeight:'bold' }}>
                    {id ? 'Update Category' : 'Add Category'}
                </button>
            </form>
        </div>
    );
};

export default AddCategory;








//import React, { useState } from 'react';
//import api from '../../api';  // Axios instance
//import { useNavigate } from 'react-router-dom';  // For navigating after adding category
//
//const AddCategory = () => {
//    const [formData, setFormData] = useState({ name: '' });
//    const navigate = useNavigate();  // For navigation
//
//    const handleChange = (e) => {
//        setFormData({ ...formData, [e.target.name]: e.target.value });
//    };
//
//    const handleSubmit = (e) => {
//        e.preventDefault();
//
//        // Add new category
//        api.post('categories/', formData)
//            .then(() => {
//                setFormData({ name: '' });
//                // Navigate back to the category list after adding
//                navigate('/');
//            })
//            .catch(err => console.error(err));
//    };
//
//    return (
//        <div>
//            <h2>Add New Category</h2>
//            <form onSubmit={handleSubmit}>
//                <input
//                    type="text"
//                    name="name"
//                    placeholder="Category Name"
//                    value={formData.name}
//                    onChange={handleChange}
//                    required
//                    style={{padding: '10px', width: '90%'}}
//                />
//                <br/><br/>
//                <button type="submit" style={{padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', borderRadius: '5px',fontWeight:'bold'}}>
//                    Add Category
//                </button>
//            </form>
//        </div>
//    );
//};
//
//export default AddCategory;
