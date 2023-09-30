import axios from "axios";
import React from "react";

export function Adduser(){
    function handleAddUser(){
        let addUser = {
            username : document.getElementById("username").value,
            email : document.getElementById("email").value,
            phonenumber : document.getElementById("phonenumber").value
        }

        axios.post("http://localhost:8000/addUser",addUser)
        .then((res) => {
            if(res.data.status === "error"){
                alert("errro")
            }
            else if(res.data.status === "success"){
                alert("success")
                window.location.href = "/adminDashBoard";
            }
        })
    }
    return(
        <>
        <div className="adduser">
            <div className="card">
                <h4 className="mb-3 mt-3">Add Member</h4>
                <input id="username" className="mb-2 py-2 ps-3" type="text" placeholder="Enter the username"/><br/>
                <input id="email" className="mb-2 py-2 ps-3" type="email" placeholder="Enter the Email" required/><br/>
                <input id="phonenumber" className="mb-2 py-2 ps-3" type="tele" placeholder="Enter the Phone Number" required/><br/>
                <input type="button" className="addbtn py-2 ps-3 mb-4" onClick={handleAddUser} value="Add User"/>
            </div>
            </div>
        </>
    );
}