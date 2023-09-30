import axios from "axios";
import React from "react";

export function Login(){
    function handleLogin(){
        var email =  document.getElementById("email").value
        var password = document.getElementById("password").value
        let loginDetails ={
         email : email,
         password : password
        }
        var pattern1 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var pattern2 = /\w\S{6,20}/;

        var check1 = pattern1.test(email);
        var check2 = pattern2.test(password);

        if(check1 == true){
            if(check2 == true){
                axios.post("http://localhost:8000/login",loginDetails)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "success"){
                alert("success")
                window.location.href = "/adminDashBoard";
            }
        })
            }
            else{
                alert("Password contains atleast 6 characters")
            }
        }
        else{
            alert("Email doesn't match the requirment")
        }
    }
    
    return(
        <>
            <div className="login">
                <div class="card">
                <h2 className="mt-4">Magnus Library</h2>
                    <div class="card-body">
                    <input type="email" className="mb-4 py-2 px-3" id="email" placeholder="Enter the Email" required/>
                <input type="password" className="mb-4 py-2 px-3" id="password" placeholder="Enter the Password" required/>
                <input className="login-btn p-2 mb-3" type="button" value="login" onClick={handleLogin}/>
  </div>
</div>
                </div>
        </>
    );
}