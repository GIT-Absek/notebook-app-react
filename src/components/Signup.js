import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    let history = useHistory();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmpassword } = credentials;
        if (password === confirmpassword) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });
        
        const json = await response.json();
        console.log(json.authToken);
        if (json.success) {
            //save the authtoken and redirect
            localStorage.setItem("token", json.authToken);
            history.push("/login");
            props.showAlert("Account created successfully!","success");
        }
        else {
            props.showAlert("Invalid details!","danger");
        }
    }
    else
    {
        props.showAlert("Invalid details!","danger");
    }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={onChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup
