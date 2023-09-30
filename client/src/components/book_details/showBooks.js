import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ShowBooks(){
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/showBooks")
        .then(res => res.json())
        .then(details => setData(details))
    },[])

    function handleDelete(id){
        let bookid = id;

        let deleteBook = {
            id : bookid
        }

        axios.post("http://localhost:8000/deleteBook",deleteBook)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "success"){
                alert("Book Removed successfully")
            }
        })
    }
    return(
        <>
            <div className="showbook">
                <h3>Book List</h3>
            <table>
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Book Title</th>
                            <th>Author Name</th>
                            <th>Quantity</th>
                            <th>Rent(Per day)</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value,index) => (
                                <>
                                    <tr>
                                        <td>{value.book_id}</td>
                                        <td>{value.book_title}</td>
                                        <td>{value.author_name}</td>
                                        <td>{value.Quantity}</td>
                                        <td>{value.rent_fee}</td>
                                        <td><Link className="btn updatebtn" to={`/updateBook/${value.book_id}`}>Update Book</Link></td>
                                        <td><button className="btn deletebtn" onClick={ () => {handleDelete(value.book_id)}}>Delete Book</button></td>
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