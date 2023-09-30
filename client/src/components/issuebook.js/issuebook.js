import axios from "axios";
import React from "react";

export function Issuebook(){
    function handleIssueBook(){
        let issuebook = {
            bookid : document.getElementById("bookid").value,
            userid : document.getElementById("userid").value,
            duedate : document.getElementById("duedate").value
        }

        axios.post("http://localhost:8000/issueBook",issuebook)
        .then((res) => {
            if(res.data.status === "error"){
                alert("error")
            }
            else  if(res.data.status === "error1"){
                    alert("insert error")
            }
            else if(res.data.status === "insert success"){
                alert("insert success")
                window.location.href = "/adminDashBoard";

            }
            else if(res.data.status === "insert error"){
                alert("invalid")
            }
            else if(res.data.status === "HighDebt"){
                alert("You reached the limit")
            }
        })
    }
    return(
        <>
        <div className="issuebook">
            <div className="card">
            <h4 className="mb-3 mt-3">Issue Book</h4>
                <input id="bookid" className="mb-3 py-2 ps-3" type="text" placeholder="Enter Book id"/>
                <input id="userid" className="mb-3 py-2 ps-3" type="text" placeholder="Enter User id"/>
                <input id="duedate" className="mb-3 py-2 ps-3" type="date"/>
                <input type="button" className="mb-4 py-2 ps-3 addbtn"  value="Issue Book" onClick={handleIssueBook}/>
            </div>
            </div>
        </>
    );
}