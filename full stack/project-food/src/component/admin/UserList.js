import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import api from "../../utils/api";
import Swal from "sweetalert2";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        api.get("users/")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    };

    const handleEdit = (id) => {
        // Navigate to the edit page with the user ID
        navigate(`/edit-user/${id}`);
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
                    api.delete(`users/${id}/`)
                        .then(() => {
                            fetchUsers();
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "The user has been deleted.",
                                "success"
                            );
                        })
                        .catch((err) => {
                            console.error(err);
                            swalWithBootstrapButtons.fire(
                                "Error!",
                                "There was an issue deleting the user.",
                                "error"
                            );
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "The user is safe :)",
                        "error"
                    );
                }
            });
    };

    return (
        <div>
            <h2>User List</h2>
            <hr />

            {/* Add New User Button */}
            <Link to="/admin/add-user">
                <button
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        border: "none",
                    }}
                >
                    Add New User
                </button>
            </Link>
            <hr />
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    fontWeight: "bold",
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
                            User Name
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
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Email
                        </th>
                        <th
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "6px",
                                fontWeight: "bold",
                                fontSize: "22px",
                            }}
                        >
                            Type
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
                <tbody style={{ fontWeight: "bold" }}>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.name}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.phone}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.email}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    fontWeight: "bold",
                                }}
                            >
                                {user.type}
                            </td>
                            <td
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "6px",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                <button
                                    onClick={() => handleEdit(user.id)} // Navigate to edit form
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
                                    onClick={() => handleDelete(user.id)}
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

export default UserList;

//import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';  // Import Link for navigation
//import api from '../api';
//import Swal from 'sweetalert2';
//
//const UserList = () => {
//    const [users, setUsers] = useState([]);
//
//    useEffect(() => {
//        fetchUsers();
//    }, []);
//
//    const fetchUsers = () => {
//        api.get('users/')
//            .then((res) => setUsers(res.data))
//            .catch((err) => console.error(err));
//    };
//
//    const handleDelete = (id) => {
//        const swalWithBootstrapButtons = Swal.mixin({
//            customClass: {
//                confirmButton: 'btn btn-success',
//                cancelButton: 'btn btn-danger',
//            },
//            buttonsStyling: false,
//        });
//
//        swalWithBootstrapButtons.fire({
//            title: 'Are you sure?',
//            text: "You won't be able to revert this!",
//            icon: 'warning',
//            showCancelButton: true,
//            confirmButtonText: 'Yes, delete it!',
//            cancelButtonText: 'No, cancel!',
//            reverseButtons: true,
//        }).then((result) => {
//            if (result.isConfirmed) {
//                api.delete(`users/${id}/`)
//                    .then(() => {
//                        fetchUsers();
//                        swalWithBootstrapButtons.fire(
//                            'Deleted!',
//                            'The user has been deleted.',
//                            'success'
//                        );
//                    })
//                    .catch((err) => {
//                        console.error(err);
//                        swalWithBootstrapButtons.fire(
//                            'Error!',
//                            'There was an issue deleting the user.',
//                            'error'
//                        );
//                    });
//            } else if (result.dismiss === Swal.DismissReason.cancel) {
//                swalWithBootstrapButtons.fire(
//                    'Cancelled',
//                    'The user is safe :)',
//                    'error'
//                );
//            }
//        });
//    };
//
//    return (
//        <div>
//            <h2>User List</h2>
//            <hr />
//
//            {/* Add New User Button */}
//            <Link to="/add-user">
//                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold', borderRadius: '5px', border: 'none' }}>
//                    Add New User
//                </button>
//            </Link>
//            <hr />
//            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontWeight: 'bold' }}>
//                <thead>
//                    <tr>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>User Name</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Phone</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Email</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Type</th>
//                        <th style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold', fontSize: '22px' }}>Actions</th>
//                    </tr>
//                </thead>
//                <tbody style={{ fontWeight: 'bold' }}>
//                    {users.map((user) => (
//                        <tr key={user.id}>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{user.name}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{user.phone}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{user.email}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', fontWeight: 'bold' }}>{user.type}</td>
//                            <td style={{ borderBottom: '1px solid #ddd', padding: '6px', textAlign: 'center', fontWeight: 'bold' }}>
//                                <button
////                                    onClick={() => handleEdit(user)}
//                                    style={{ marginRight: '8px', padding: '5px 8px', cursor: 'pointer', fontWeight: 'bold', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '20px' }}
//                                >
//                                    Edit
//                                </button>
//                                <button
//                                    onClick={() => handleDelete(user.id)}
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
//export default UserList;

//import React, { useState, useEffect } from "react";
//import api from "../api";
//import Swal from 'sweetalert2';
//
//const UserList = () => {
//  const [users, setUsers] = useState([]);
//  const [formData, setFormData] = useState({
//    type: "customer",
//    name: "",
//    phone: "",
//    email: "",
//    password: "",
//    address: "",
//  });
//  const [editMode, setEditMode] = useState(false);
//  const [currentId, setCurrentId] = useState(null);
//
//
//  useEffect(() => {
//    fetchUsers();
//  }, []);
//
//  const fetchUsers = () => {
//    api
//      .get("users/")
//      .then((res) => setUsers(res.data))
//      .catch((err) => console.error(err));
//  };
//
//  // @ts-ignore
//  const handleAddNew = () => {
//    setFormData({
//      type: "customer",
//      name: "",
//      phone: "",
//      email: "",
//      password: "",
//      address: "",
//    });
//    setEditMode(false);
//  };
//
//  const handleEdit = (user) => {
//    setFormData(user);
//    setCurrentId(user.id);
//    setEditMode(true);
//  };
//
//
//
//  const handleDelete = (id) => {
//  const swalWithBootstrapButtons = Swal.mixin({
//    customClass: {
//      confirmButton: 'btn btn-success',
//      cancelButton: 'btn btn-danger',
//    },
//    buttonsStyling: false,
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
//    reverseButtons: true,
//  }).then((result) => {
//    if (result.isConfirmed) {
//
//      api
//        .delete(`users/${id}/`)
//        .then(() => {
//
//          fetchUsers();
//
//
//          swalWithBootstrapButtons.fire(
//            'Deleted!',
//            'The user has been deleted.',
//            'success'
//          );
//        })
//        .catch((err) => {
//
//          console.error(err);
//
//          swalWithBootstrapButtons.fire(
//            'Error!',
//            'There was an issue deleting the user.',
//            'error'
//          );
//        });
//    } else if (result.dismiss === Swal.DismissReason.cancel) {
//
//      swalWithBootstrapButtons.fire(
//        'Cancelled',
//        'The user is safe :)',
//        'error'
//      );
//    }
//  });
//};
//
//
//
//  const handleSubmit = (e) => {
//    e.preventDefault();
//    if (editMode) {
//
//      api
//        .put(`users/${currentId}/`, formData)
//        .then(() => {
//          fetchUsers();
//          setFormData({
//            type: "customer",
//            name: "",
//            phone: "",
//            email: "",
//            password: "",
//            address: "",
//          });
//          setEditMode(false);
//        })
//        .catch((err) => console.error(err));
//    } else {
//
//      api
//        .post("users/", formData)
//        .then(() => {
//          fetchUsers();
//          setFormData({
//            type: "customer",
//            name: "",
//            phone: "",
//            email: "",
//            password: "",
//            address: "",
//          });
//        })
//        .catch((err) => console.error(err));
//    }
//  };
//
//  const handleChange = (e) => {
//    setFormData({
//      ...formData,
//      [e.target.name]: e.target.value,
//    });
//  };
//
//  return (
//    <div>
//      <h2>User List</h2>
//      <hr />
//
//
//      <form onSubmit={handleSubmit}>
//        <select
//          name="type"
//          value={formData.type}
//          onChange={handleChange}
//          style={{ width: "90%" }}
//          required
//        >
//          <option value="customer">Customer</option>
//          <option value="admin">Admin</option>
//        </select>
//        <br />
//        <br />
//        <input
//          style={{ width: "90%" }}
//          type="text"
//          name="name"
//          placeholder="Name"
//          value={formData.name}
//          onChange={handleChange}
//          required
//        />
//        <br />
//        <br />
//        <input
//          style={{ width: "90%" }}
//          type="text"
//          name="phone"
//          placeholder="Phone"
//          value={formData.phone}
//          onChange={handleChange}
//          required
//        />
//        <br />
//        <br />
//        <input
//          style={{ width: "90%" }}
//          type="email"
//          name="email"
//          placeholder="Email"
//          value={formData.email}
//          onChange={handleChange}
//          required
//        />
//        <br />
//        <br />
//
//        <input
//          style={{ width: "90%" }}
//          type="password"
//          name="password"
//          placeholder="Password"
//          value={formData.password}
//          onChange={handleChange}
//          required
//        />
//        <br />
//        <br />
//        <textarea
//          style={{ width: "90%" }}
//          name="address"
//          placeholder="Address"
//          value={formData.address}
//          onChange={handleChange}
//          required
//        />
//        <br />
//        <br />
//        <button
//          type="submit"
//          style={{
//            marginRight: "8px",
//            padding: "5px 8px",
//            cursor: "pointer",
//            fontWeight: "bold",
//            backgroundColor: "orange",
//            color: "white",
//            border:'none',
//            borderRadius:'20px',
//          }}
//        >
//          Submit
//        </button>
//      </form>
//
//      <br />
//      <hr />
//
//
//      <table
//        style={{
//          width: "100%",
//          borderCollapse: "collapse",
//          marginTop: "20px",
//          fontWeight: "bold",
//        }}
//      >
//        <thead>
//          <tr>
//            <th
//              style={{
//                borderBottom: "1px solid #ddd",
//                padding: "6px",
//                fontWeight: "bold",
//                fontSize: "22px",
//              }}
//            >
//              User Name
//            </th>
//            <th
//              style={{
//                borderBottom: "1px solid #ddd",
//                padding: "6px",
//                fontWeight: "bold",
//                fontSize: "22px",
//              }}
//            >
//              Phone
//            </th>
//            <th
//              style={{
//                borderBottom: "1px solid #ddd",
//                padding: "6px",
//                fontWeight: "bold",
//                fontSize: "22px",
//              }}
//            >
//              Email
//            </th>
//            <th
//              style={{
//                borderBottom: "1px solid #ddd",
//                padding: "6px",
//                fontWeight: "bold",
//                fontSize: "22px",
//              }}
//            >
//              Type
//            </th>
//            <th
//              style={{
//                borderBottom: "1px solid #ddd",
//                padding: "6px",
//                fontWeight: "bold",
//                fontSize: "22px",
//              }}
//            >         Actions
//            </th>
//          </tr>
//        </thead>
//        <tbody style={{ fontWeight: "bold" }}>
//          {users.map((user) => (
//            <tr key={user.id}>
//              <td
//                style={{
//                  borderBottom: "1px solid #ddd",
//                  padding: "6px",
//                  fontWeight: "bold",
//                }}
//              >
//                {user.name}
//              </td>
//              <td
//                style={{
//                  borderBottom: "1px solid #ddd",
//                  padding: "6px",
//                  fontWeight: "bold",
//                }}
//              >
//                {user.phone}
//              </td>
//              <td
//                style={{
//                  borderBottom: "1px solid #ddd",
//                  padding: "6px",
//                  fontWeight: "bold",
//                }}
//              >
//                {user.email}
//              </td>
//              <td
//                style={{
//                  borderBottom: "1px solid #ddd",
//                  padding: "6px",
//                  fontWeight: "bold",
//                }}
//              >
//                {user.type}
//              </td>
//              <td
//                style={{
//                  borderBottom: "1px solid #ddd",
//                  padding: "6px",
//                  textAlign: "center",
//                  fontWeight: "bold",
//                }}
//              >
//                <button
//                  onClick={() => handleEdit(user)}
//                  style={{
//                    marginRight: "8px",
//                    padding: "5px 8px",
//                    cursor: "pointer",
//                    fontWeight: "bold",
//                    backgroundColor: "green",
//                    color: "white",
//                    border:'none',
//                    borderRadius:'20px',
//                  }}
//                >
//                  Edit
//                </button>
//                <button
//                  onClick={() => handleDelete(user.id)}
//                  style={{
//                    marginRight: "8px",
//                    padding: "5px 8px",
//                    cursor: "pointer",
//                    fontWeight: "bold",
//                    backgroundColor: "red",
//                    color: "white",
//                    border:'none',
//                    borderRadius:'20px',
//                  }}
//                >
//                  Delete
//                </button>
//              </td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//    </div>
//  );
//};
//
//export default UserList;
