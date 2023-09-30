import axios from "axios";
import React from "react";

export function AddBook(){
    function handleAddBook(){
        let addbook = {
            bookname : document.getElementById("bookname").value,
            author : document.getElementById("author").value,
            quantity : document.getElementById("quantity").value,
            rent : document.getElementById("rent").value
        }

        axios.post("http://localhost:8000/addBook",addbook)
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
    return(
        <>
        <div className="addbook">
            <div className="card">
            <h4 className="mb-3 mt-3">Add Book</h4>
                <input type="text" className="mb-3 py-2 ps-3" id="bookname" placeholder="Enter the Book Name"/>
                <input type="text" className="mb-3 py-2 ps-3" id="author" placeholder="Enter the Author Name"/>
                <input type="number" className="mb-3 py-2 ps-3" id="quantity" placeholder="Enter the Quantity"/>
                <input type="text" className="mb-3 py-2 ps-3" id="rent" placeholder="Enter the Rent"/>
                <input type="button" className="mb-3 py-2 ps-3 addbtn" onClick={handleAddBook} value="Add Book"/>
            </div>
            </div>
        </>
    );
}