import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ShowIssuedBooks(){
    const[data,setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/showIssuedBooks")
        .then(res => res.json())
        .then(details => setData(details))
    },[])
    function handleRetrn(id){
        let trid = id;

        let returnBook = {
            id : trid
        }

        axios.post("http://localhost:8000/returnBook",returnBook)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "error1"){
                alert("error1")
            }
            else if(res.data.status === "success1"){
                alert("Book successfully added to the return list")
            }
        })
    }
    return(
        <>
            <div className="showissuebook">
            <h3>Issued Book List</h3>
            <table>
               
                    <thead>
                        <tr>
                            <th>Transcation Id</th>
                            <th>Book Id</th>
                            <th>User Id</th>
                            <th>Transcation Date</th>
                            <th>Due Date</th>
                            <th>Return Date</th>
                            <th>Payable Debt</th>
                            <th>Fine Amount</th>
                            <th>Book Status</th>
                            <th>Return Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value,index) => (
                                <>
                                    <tr>
                                        <td>{value.transaction_id}</td>
                                        <td>{value.book_id}</td>
                                        <td>{value.user_id}</td>
                                        <td>{value.transaction_date}</td>
                                        <td>{value.due_date}</td>
                                        <td>{value.return_date}</td>
                                        <td>{value.rent_fee}</td>
                                        <td>{value.fine_amount}</td>
                                        <td>{value.book_status}</td>
                                        <td><button className="btn returnbtn" onClick={()=>{handleRetrn(value.transaction_id)}}>Return</button></td>
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