import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './user.css'

export function ShowUsers(){
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/showUsers")
        .then(res => res.json())
        .then(details => setData(details))
    },[])

    function handleDelete(id){
        let userid = id;

        let deleteUser={
            id : userid
        }

        axios.post("http://localhost:8000/deleteUser",deleteUser)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "success"){
                alert("Member deleted successfully")
            }
        })
    }
    
    return(
        <>
            <div className="showuser">
            <h3>Members List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value,index) => (
                                <>
                                    <tr>
                                        <td>{value.user_id}</td>
                                        <td>{value.user_name}</td>
                                        <td>{value.email}</td>
                                        <td>{value.phone_number}</td>
                                        <td><Link className="btn updatebtn" to={`/updateUser/${value.user_id}`}>Update</Link></td>
                                        <td><button className="btn deletebtn" onClick={() => {handleDelete(value.user_id)}}>Delete</button></td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}