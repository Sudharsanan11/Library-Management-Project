import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UpdateUser(){
    let {id} = useParams()
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[number,setNumber] = useState('')
    useEffect(() => {
        fetch("http://localhost:8000/getOneUser/"+id)
        .then(data => data.json())
        .then((res) => {
            setUsername(res[0].user_name)
            setEmail(res[0].email)
            setNumber(res[0].phone_number)
        })
    },[])
    function handleUpdateUser(){
    let updateUser = {
        username : document.getElementById("username").value,
        email : document.getElementById("email").value,
        phonenumber : document.getElementById("phonenumber").value
    }

    axios.post("http://localhost:8000/updateUser/"+id,updateUser)
    .then((res) => {
        if(res.data.status === "error"){
            alert("errro")
        }
        else if(res.data.status === "success"){
            alert("success")
            window.location.href = "/showUser";
        }
    })
}

    return(
        <>
        <div className="updateuser">
            <div className="card p-4">
                <h4>Update User</h4>
                            <input id="username" className="mb-3 py-2 ps-3" type="text" onChange={(updatedata) => {setUsername(updatedata.target.value)}} value={username} required/>
                             <input className="mb-3 py-2 ps-3" id="email" type="email" onChange={(updatedata) => {setEmail(updatedata.target.value)}} value={email} required/>
                            <input className="mb-3 py-2 ps-3" id="phonenumber" onChange={(updatedata) => {setNumber(updatedata.target.value)}} type="tele" value={number} required/>
                        <input className="mb-3 py-2 ps-3 updatebtn" type="button" onClick={handleUpdateUser} value="Update User"/>
                    
            </div>
            </div>
        </>
    );
}