import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie"


export function UserLogin(){

   const [cookies, setCookies, removeCookie] = useCookies('userid');
    let navigate = useNavigate();

     
        const formik = useFormik({
            initialValues: {
                UserId: '',
                Password: ''
            },
            onSubmit: (formdata)=> {
                axios.get('http://127.0.0.1:3300/get-users')
                .then((response)=>{
                    var user = response.data.find(user=> user.UserId===formdata.UserId);
                    if(user.Password===formdata.Password){
                        setCookies('userid', formdata.UserId);
                         navigate('/dashboard');
                    } else {
                        navigate('/error');
                    }
                })
            }
        })
      

    return(
        <div style={{height:'400px'}} className=" me-4 pe-4 d-flex justify-content-end align-item-center">
            <div>
            <h1 className="text-white"> <span className="bi bi-person-fill"></span> User Login</h1>
            <form onSubmit={formik.handleSubmit} className="bg-white text-dark p-4">
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <Button type="submit" variant="contained" color="info" className="w-100">Login</Button>
                <Link className="btn btn-link w-100 mt-2" to='/register'>New User?  Register</Link>
            </form>
            </div>
        </div>
    )
}