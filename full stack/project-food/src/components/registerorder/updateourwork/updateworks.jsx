import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";

function EditWorks() {
    const { index } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState({
        title: "",
        details: "",
        image: null,
        slug: "",
        meter: "", 
        days: "",  
    });

    useEffect(() => {
        const storedWorks = JSON.parse(localStorage.getItem('works')) || [];
<<<<<<<< HEAD:src/components/ourworks/editworks/updateworks.jsx
        setWork(storedWorks[index]);
========
        setWork(storedWorks[Number(index)]);
>>>>>>>> 967dce0 (edit our works added):src/components/ourworks/editworks/EditWorks.jsx
    }, [index]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            const generatedSlug = value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            setWork({ ...work, title: value, slug: generatedSlug });
        } else {
            setWork({ ...work, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setWork({ ...work, image: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingWorks = JSON.parse(localStorage.getItem('works')) || [];
<<<<<<<< HEAD:src/components/ourworks/editworks/updateworks.jsx
        existingWorks[index] = { ...work, image: work.image ? URL.createObjectURL(work.image) : existingWorks[index].image };
========
        existingWorks[Number(index)] = {
            ...work,
            image: work.image ? URL.createObjectURL(work.image) : existingWorks[Number(index)].image,
        };
>>>>>>>> 967dce0 (edit our works added):src/components/ourworks/editworks/EditWorks.jsx
        localStorage.setItem('works', JSON.stringify(existingWorks));
        navigate("/viewworks");
    };

    return (
        <>
            <ScrollToTopPages />
            <div className="createproject">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Edit Work</h2>
                    </div>

                    <div className="content">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {work.image && <img src={work.image} alt={work.title} className="existing-image" />}
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    id="title"
                                    value={work.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="details">
                                    Details:
                                </label>
                                <textarea
                                    className="form-control"
                                    name="details"
                                    id="details"
                                    value={work.details}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="meter">
                                    Meter:
                                </label>
                                <input
                                    type="number"
                                    name="meter"
                                    className="form-control"
                                    id="meter"
                                    value={work.meter}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="days">
                                    Days:
                                </label>
                                <input
                                    type="number"
                                    name="days"
                                    className="form-control"
                                    id="days"
                                    value={work.days}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="buttons">
                                <Button className="btn" type="submit">
                                    Save Changes
                                </Button>
                                <Button
                                    className="btn"
                                    type="button"
                                    onClick={() => navigate("/viewworks")}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditWorks;
