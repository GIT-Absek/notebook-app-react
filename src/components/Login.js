import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    let history = useHistory();

    const [credentials, setCredentials] = useState({email:"",password:""});

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });

        const json = await response.json();
        console.log(json.authToken);
        if(json.success)
        {
            //save the authtoken and redirect
            localStorage.setItem("token",json.authToken);
            props.showAlert("Logined successfully!","success");
            history.push("/");
        }
        else
        {
            props.showAlert("Invalid Credentials!","danger");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
