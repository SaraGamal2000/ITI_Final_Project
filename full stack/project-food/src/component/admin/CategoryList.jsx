import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import api from "../../utils/api";
import Swal from "sweetalert2";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        api.get("categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    };

    const handleEdit = (id) => {
        // Navigate to the edit page with the category ID
        navigate(`/edit-category/${id}`);
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
                    api.delete(`categories/${id}/`)
                        .then(() => {
                            fetchCategories();
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "The category has been deleted.",
                                "success"
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            swalWithBootstrapButtons.fire(
                                "Error!",
                                "There was an issue deleting the category.",
                                "error"
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "The category is safe :)",
                        "error"
                    );
                }
            });
    };

    return (
        <div>
            <h2>Category List</h2>
            <hr />

            {/* Add New Category Button */}
            <Link to="/add-category">
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        fontWeight: "bold",
                    }}
                >
                    Add New Category
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
                            Category Name
                        </th>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {category.name}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    textAlign: "center",
                                }}
                            >
                                <button
                                    onClick={() => handleEdit(category.id)} // Navigate to edit form
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
                                    onClick={() => handleDelete(category.id)}
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
