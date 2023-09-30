import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function UpdateBook(){
    let {id} = useParams()
    const[booktitle,setBooktitle] = useState('')
    const[author,setAuthor] = useState('')
    const[Quantity,setQuantity] = useState('')
    const[rent,setRent] = useState('')
    useEffect(() => {
        fetch("http://localhost:8000/getOneBook/"+id)
        .then(data => data.json())
        .then((res) => {
            setBooktitle(res[0].book_title)
            setAuthor(res[0].author_name)
            setQuantity(res[0].Quantity)
            setRent(res[0].rent_fee)
        })
    },[]) 
    function handleUpdateBook(){
        let updateBook = {
            bookname : document.getElementById("bookname").value,
            author : document.getElementById("author").value,
            Quantity : document.getElementById("quantity").value,
            rent : document.getElementById("rent").value
        }

        axios.post("http://localhost:8000/updateBook/"+id,updateBook)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else if(res.data.status === "success"){
                alert("success")
                window.location.href = "/showBook";
            }
        })
    }
    return(
        <>
        <div className="updatebook">
            <div className="card p-4">
                <h4 className="mb-4 mt-2">Update Book</h4>
            <input type="text" className="mb-3 py-2 ps-3" id="bookname" onChange={(updatedata) => {setBooktitle(updatedata.target.value)}} value={booktitle} placeholder="Enter the Book Name"/>
                <input type="text" className="mb-3 py-2 ps-3" id="author" onChange={(updatedata) => {setAuthor(updatedata.target.value)}} value={author} placeholder="Enter the Author Name"/>
                <input type="number" className="mb-3 py-2 ps-3" id="quantity" value={Quantity} onChange={(updatedata) => {setQuantity(updatedata.target.value)}} placeholder="Enter the Quantity"/>
                <input type="text" className="mb-3 py-2 ps-3" id="rent" value={rent} onChange={(updatedata) => {setRent(updatedata.target.value)}} placeholder="Enter the Rent"/>
                <input type="button" className="mb-3 py-2 ps-3 btn updatebtn" onClick={handleUpdateBook} value="Add Book"/>
            </div>
            </div>
        </>
    );
}