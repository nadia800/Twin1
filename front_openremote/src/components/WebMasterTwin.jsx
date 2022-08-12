import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { uploadfile, getmaster_realms } from '../actions/uploaded/upload';
import { getAllRealms } from '../actions/get/get';
import "../scss/WebMasterTwin.scss";
import axios from "axios";
import { URL } from '../services/URL';

import { Container, Form, Button } from 'react-bootstrap'
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const WebMasterTwin = () => {
    const [nameProjectList, setNameProjectList] = useState([]);
    const [nameProject, setNameProject] = useState("");
    const [friendlyNameProject, setFriendlyNameProject] = useState("");
    const [categorieList, setCategorieList] = useState(["categorie1", "categorie2", "categorie3"])
    const [categorie, setCategorie] = useState();

    const [subcategorieList, setSubcategorieList] = useState(["sub1", "sub2", "sub3"]);
    const [subcategorie, setSubcategorie] = useState();

    const [path1, setPath1] = useState();
    const [path2, setPath2] = useState();
    const [path3, setPath3] = useState();
    const [path4, setPath4] = useState();


    const [message, setMessage] = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllRealms())
            .then((data) => {
                setNameProjectList([...nameProject, ...data.data])
            })
    },[]);
    const onFileUpload = async () => {
        if (nameProject.length && path1.length && path2.length && path3.length && path4.length) {
            setMessage('please set all !')
        } else {
            setMessage('Loading...')
            const data = new FormData();
            data.append('title', nameProject)
            data.append('file', path1)
            data.append('file', path2)
            data.append('file', path3)
            data.append('file', path4)
            await axios.post(`${URL}/api/file/upload`, data)
        }
        
        
    }
   
    return (
        
        <div className="bodyUpload">
            <div className="bodyUpload__box">
                <div className="bodyUpload__box__title">Project Upload</div>
                <br />
                <Form method="POST" encType='multipart/form-data'>

                    <Form.Group controlId="fileName" className="mb-3">
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label className="bodyUpload__box__label">Project Name:</Form.Label>
                            <br/>
                            <select
                                className="categorie"
                                id="body__categorie"
                                onChange={(e) => {
                                    setNameProject(e.target.value)
                                }}
                            >
                                <option value="null">Choose a Realm</option>
                                {nameProjectList.map((project, index) =>
                                    <option key={index} value={project.realmName}>{project.realmName}</option>
                                )}
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="projectCategorie">
                            <Form.Label className="bodyUpload__box__label">Select Project Categorie:</Form.Label>
                            <div className="body__categorie__list">
                                <select
                                    className="categorie"
                                    id="body__categorie"
                                    onChange={(e) => {
                                        setCategorie(e.target.value)
                                    }}
                                >
                                    <option value="null">Choose a Categorie</option>
                                    {categorieList.map((categorie, index) =>
                                        <option key={index} value={categorie}>{categorie}</option>
                                    )}
                                </select>
                            </div>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="projectSubcategorie">
                            <Form.Label className="bodyUpload__box__label">Select Project SubCategorie:</Form.Label>
                            <br/>
                            <select
                                className="categorie"
                                id="body__subcategorie"
                                onChange={(e) => {
                                    setSubcategorie(e.target.value)
                                }}
                            >
                                <option value="null">Choose a Subcategorie</option>
                                {subcategorieList.map((subcategorie, index) =>
                                    <option key={index} value={subcategorie}>{subcategorie}</option>
                                )}
                            </select>
                        </Form.Group>
                        <Form.Label className="bodyUpload__box__label">Select Project File:</Form.Label>
                        <Form.Control
                            className="file__input"
                            type="file"
                            name='file'
                            placeholder="WebGL File..."
                            onChange={(e) => {
                                console.log(e.target.files)
                                //multiple files
                                setPath1(e.target.files[0])
                                setPath2(e.target.files[1])
                                setPath3(e.target.files[2])
                                setPath4(e.target.files[3])
                            }}
                            multiple
                        />
                    </Form.Group>
                    <Button className="file__button" type="button" onClick={onFileUpload}>
                        Upload!
                    </Button>
                </Form>
                <div style={{
                    fontSize: "15px",
                    color: 'red'
                }}>{message}</div>
            </div>
            </div>
    )
}

export default WebMasterTwin;

/*
 *  <label className="bodyUpload__box__label">Project Name:</label>
                <br/>
                <select
                    className="categorie"
                    id="body__categorie"
                    onChange={(e) => {
                        setNameProject(e.target.value)
                    }}
                >
                    <option value="null">Choose a Realm</option>
                    {nameProjectList.map((project, index) =>
                        <option key={index} value={project.realmName}>{project.realmName}</option>
                    )}
                </select>
                <br />

                <label className="bodyUpload__box__label">Select Project Categorie:</label>
            <br/>
            <div className="body__categorie__list">
                <select
                        className="categorie"
                        id="body__categorie"
                        onChange={(e) => {
                            setCategorie(e.target.value)
                        }}
                >
                    <option value="null">Choose a Categorie</option>
                    {categorieList.map((categorie, index) =>
                        <option key={index} value={categorie}>{categorie}</option>
                    )}
                </select>
                </div>
                <label className="bodyUpload__box__label">Select Project SubCategorie:</label>
                <br />
            <div className="body__subcategorie__list">
                <select
                    className="categorie"
                    id="body__subcategorie"
                    onChange={(e) => {
                        setSubcategorie(e.target.value)
                    }}
                >
                    <option value="null">Choose a Subcategorie</option>
                    {subcategorieList.map((subcategorie, index) =>
                        <option key={index} value={subcategorie}>{subcategorie}</option>
                    )}
                </select>
            </div>
                <label className="bodyUpload__box__label">Select Project File:</label>
                <br/>
                <input
                    className="file__input"
                    name="file"
                    directory=""
                    webkitdirectory=""
                    type="file"
                    placeholder="WebGL File..."
                    onChange={(e) => {
                        var str = e.target.files[0].webkitRelativePath
                        var path = str.split("/")
                        setCurrentPath(e.target.files[0])
                    }}
                />
                <br/>
            <button className= "file__button" onClick={() => onFileUpload()}>
                Upload!
                </button>
 */