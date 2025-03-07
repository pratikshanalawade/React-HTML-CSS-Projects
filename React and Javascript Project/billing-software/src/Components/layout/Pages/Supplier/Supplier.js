import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
const initialState = {
    name: '',
    company: '',
    gstinnumber: "",
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: ''
}
const Supplier = () => {
    const [formState, setFormState] = useState(initialState);
    let params = useParams();
    const navigate = useNavigate();
    const [editUser, setEditUser] = useState(Object.keys(params).length !== 0 ? true : false)
    useEffect(() => {
        if (editUser) {
            axios.get(`http://localhost:3001/supplier/${params?.id}`)
                .then((response) => updateUserFormData(response?.data))
                .catch((error) => console.log(error));
        }
    }, [])
    const updateUserFormData = (data) => {
        setFormState({ ...data });
    }


    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('http://localhost:3001/supplier')
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))
    }
    const createUser = () => {
        if (editUser) {
            axios.put(`http://localhost:3001/supplier/${params?.id}`, formState)
              .then((response) => {
                let newState = { ...initialState };
                // newState.hobbies = [];
                setFormState(newState);
                navigate('/');
              })
              .catch((error) => console.log(error))
          } else {
            axios.post('http://localhost:3001/supplier', formState)
              .then((response) => {
                let newState = { ...initialState };
                // newState.hobbies = [];
                setFormState(newState);
              })
              .catch((error) => console.log(error))
          }

        // axios.post('http://localhost:3001/supplier', formState)
        //     .then((response) => console.log(response.data))
        //     .catch((error) => console.log(error))
    }
    const formValueChange = (event, fieldType) => {
        let newState = { ...formState };
        switch (fieldType) {
            case "NAME":
                newState.name = event.target.value
                break;
            case "COMPANY":
                newState.company = event.target.value
                break;
            case "GSTINNUMBER":
                newState.gstinnumber = event.target.value
                break;
            case "EMAIL":
                newState.email = event.target.value
                break;
            case "PHONE":
                newState.phone = event.target.value
                break;

            case "ADDRESS":
                newState.address = event.target.value
                break;

            case "CITY":
                newState.city = event.target.value
                break;

            case "STATE":
                newState.state = event.target.value
                break;
            case "COUNTRY":
                newState.country = event.target.value
                break;

            default:
                break;
        }
        setFormState({ ...newState });
    }



    return (
        <div className="customer bg-img">
            <form className="mt-5">
            <h3 className="mt-3 text-primary">{!editUser ? 'Create' : 'Update'}  Supplier </h3>
                <div className="container  form-group row my-3 ">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10 my-2">
                        <input type="text" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "NAME")} />
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">Company</label>
                        <div className="col-sm-10 ">
                            <input type="text" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "COMPANY")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">GSTINNUM</label>
                        <div className="col-sm-10 ">
                            <input type="text" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "GSTINNUMBER")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">Email</label>
                        <div className="col-sm-10 ">
                            <input type="email" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "EMAIL")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">Phone</label>
                        <div className="col-sm-10 ">
                            <input type="number" className=" col-sm-2 form-control" onChange={(event) => formValueChange(event, "PHONE")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">Address</label>
                        <div className="col-sm-10 my-1">
                            <input type="text" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "ADDRESS")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className=" col-sm-2 form-label">City</label>
                        <div className="col-sm-10 my-1">
                            <input type="text" className="col-sm-2 form-control" onChange={(event) => formValueChange(event, "CITY")} />
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">State</label>
                        <div className="col-sm-10 my-1">
                            <select id="inputState" className="form-select" onChange={(event) => formValueChange(event, "STATE")}>
                                <option >Choose...</option>
                                <option>MAH</option>
                                <option>GUJRAT</option>
                                <option>TELANGANA</option>
                                <option>MP</option>
                                <option>UP</option>
                                <option>AASAM</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row my-2">
                        <label className="col-sm-2 form-label">Country</label>
                        <div className="col-sm-10 my-1">
                            <select id="inputState" className="form-select" onChange={(event) => formValueChange(event, "COUNTRY")}>
                                <option >Choose...</option>
                                <option>India</option>
                                <option>Pak</option>
                                <option>Shrilanka</option>
                                <option>Austrelia</option>
                                <option>USA</option>
                                <option>UK</option>
                            </select>
                        </div>
                    </div>
                   
                    <div className="form-group row my-2">
                        <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary" onClick={() => createUser()}>{!editUser ? 'Create' : 'Update'} Supplier </button>
                            {/* <button type="submit" className="btn btn-primary" onClick={() => { createUser() }}>Vendor</button> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Supplier

