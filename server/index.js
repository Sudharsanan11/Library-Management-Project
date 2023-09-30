const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const crypto = require("crypto");

var expressfun = express()
expressfun.use(cors())
expressfun.use(bodyparser.json())
expressfun.use(express.json())
expressfun.use(bodyparser.urlencoded({extended:true}))
expressfun.use(express.static("public"))

let db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sudharsanan11@sql",
    database: "lm"
})
db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("db connected")
    }
})
//Admin Login
expressfun.post("/login",(request,response) => {
    let {email,password} = request.body
    console.log(email)
    let loginQuery = 'select * from admin_login where email=?';
    db.query(loginQuery,[email],(error,result) => {
        if(error){
            response.send({"send":"error"})
            console.log("error");
        }
        else if(result.length > 0){
            let dbemail = result[0].email;
            let dbpassword = result[0].password;
            if(dbemail === email && dbpassword == password){
                response.send({"status":"success"})
                console.log("success");
            }
            else{
                response.send({"status":"invalid"})
                console.log("invalid");
            }
        }
        else{
            response.send({"status":"empty_set"})
            console.log("empty")
        }
    })
})

//Add Members to the library
expressfun.post("/addUser",(request,response) => {
    let {username,email,phonenumber} = request.body;
    console.log(username);
    let insertQuery = "insert into user_details(user_name,email,phone_number) values(?,?,?)";
    db.query(insertQuery,[username,email,phonenumber],(error,result) => {
        if(error){
            response.send({"status" : "error"})
            console.log(error)
        }
        else{
            response.send({"status" : "success"})
        }
    })

})

//Add books to the library
expressfun.post("/addBook",(request,response) => {
    let {bookname,author,quantity,rent} = request.body;
    let insertQuery = "insert into book_details(book_title,author_name,Quantity,rent_fee) values(?,?,?,?)";
    db.query(insertQuery,[bookname,author,quantity,rent],(error,result) => {
        if(error){
            response.send({"status" : "error"})
            console.log(error)
        }
        else{
            response.send({"status" : "success"})
        }
    })

})

//Issue a book to the member
expressfun.post("/issueBook",(request,response) => {
    let {bookid,userid,duedate} = request.body;
    console.log(bookid,userid,duedate)
   
    let get = "select * from transaction_details where user_id=? and book_status='Borrowed'";
    db.query(get,[userid],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else if(result.length == 0){
            let getQuery = "select * from lm.book_details where book_id=?";
            console.log(bookid);
            db.query(getQuery,[bookid],(error1,result1) => {
                if(error1){
                    response.send({"status":"error1"})
                }
                else{
                    let dbrent = result1[0].rent_fee;
                    let status = "Borrowed";
                    let dueDate = new Date(duedate)
                    let today = new Date();
                    let diff = dueDate.getTime() - today.getTime();
                    let day = diff/(1000*60*60*24);
                    console.log(day);
                    let todayDate = today.toISOString().slice(0,10);
                    let totalRent = dbrent*day;
                    let insertQuery = "insert into transaction_details(book_id,user_id,transaction_date,due_date,book_status,rent_fee) values(?,?,?,?,?,?)";
                    db.query(insertQuery,[bookid,userid,todayDate,duedate,status,totalRent],(error2,result2) => {
                        if(error2){
                            response.send({"status" : "insert error"})
                            console.log(error2)
                        }
                        else{
                            response.send({"status" : "insert success"})
                        }
                    })
                }
            })
        }
        else if(result.length > 0){
            let getQuery = "select * from lm.book_details where book_id=?";
            db.query(getQuery,[bookid],(error1,result1) => {
                if(error1){
                    response.send({"status":"error1"})
                }
                else{
                    let dbrent = result1[0].rent_fee
                    let sum = 0;
                    for(let i=0;i< result.length;i++){
                        sum += result[i].rent_fee
                    }
                            let status = "Borrowed";
                            let dueDate = new Date(duedate)
                            let today = new Date();
                            let diff = dueDate.getTime() - today.getTime();
                            let day = diff/(1000*60*60*24);
                            let todayDate = today.toISOString().slice(0,10);
                            let totalRent = dbrent*day;
                            let totalsum = sum + totalRent;
                            if(totalsum < 500){
                                let insertQuery = "insert into transaction_details(book_id,user_id,transaction_date,due_date,book_status,rent_fee) values(?,?,?,?,?,?)";
                                db.query(insertQuery,[bookid,userid,todayDate,duedate,status,totalRent],(error2,result2) => {
                                if(error2){
                                    response.send({"status" : "insert error"})
                                    console.log(error2)
                                }
                                else{
                                    response.send({"status" : "insert success"})
                                }
                            })
                            }
                            else if(totalsum >= 500){
                                response.send({"status":"HighDebt"})
                            }
                        }
                    })
                }
        }
     ) })


//Return the book
expressfun.post("/returnBook",(request,response) => {
    let id = request.body.id
    console.log(id);
    let select = "select * from transaction_details where transaction_id=?";
    db.query(select,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            let transdate = new Date(result[0].transaction_date)
            let duedate = new Date(result[0].due_date)
            let returndate = new Date();
            let diff = duedate.getTime() - transdate.getTime();
            let diff1 = returndate.getTime() - transdate.getTime();
            let fine = 0;
            let due = diff/(1000*60*60*24);
            let ret = diff1/(1000*60*60*24);

            if(due >= ret){
                let status = "Returned";
                let update = "update transaction_details set return_date=?, fine_amount=?,book_status=? where transaction_id=?";
                db.query(update,[returndate,fine,status,id],(error1,result1) => {
                    if(error1){
                        response.send({"status":"error1"})
                    }
                    else{
                        response.send({"status":"success1"})
                    }
                })
            }
            else{
                let diff2 = ret - due;
                let perdayfine = 10;
                let fine = diff2 * perdayfine;
                let status = "Returned";
                let update = "update transaction_details set return_date=?, fine_amount=?,book_status=? where transaction_id=?";
                db.query(update,[returndate,fine,status,id],(error1,result1) => {
                    if(error1){
                        response.send({"status":"error1"})
                    }
                    else{
                        response.send({"status":"success1"})
                    }
                })
            }
        }
    })
})


//Show all the members in the library
expressfun.get("/showUsers",(request,response) => {
    let selectQuery = "select * from user_details";
    db.query(selectQuery,(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

//Show all the books in the library
expressfun.get("/showBooks",(request,response) => {
    let selectQuery = "select * from book_details";
    db.query(selectQuery,(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

//Show all the issued books in the library
expressfun.get("/showIssuedBooks",(request,response) => {
    let selectQuery = "select * from transaction_details";
    db.query(selectQuery,(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

//Get one member with id
expressfun.get("/getOneUser/:id",(request,response) => {
    let {id} = request.params
    let selectQuery = "select * from user_details where user_id=?";
    db.query(selectQuery,[id],(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

//Update one member with id
expressfun.post("/updateUser/:id",(request,response) => {
    let {id} = request.params
    let {username,email,phonenumber}= request.body
    let updateQuery = "update user_details set user_name=?,email=?,phone_number=? where user_id=?";
    db.query(updateQuery,[username,email,phonenumber,id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})

//Get one book with id
expressfun.get("/getOneBook/:id",(request,response) => {
    let {id} = request.params
    let selectQuery = "select * from book_details where book_id=?";
    db.query(selectQuery,[id],(error,result) => {
        if(error){
            response.send(error)
            console.log(error)
        }
        else{
            response.send(result)
            console.log(result)
        }
    })
})

//Update one book with id
expressfun.post("/updateBook/:id",(request,response) => {
    let {id} = request.params
    let {bookname,author,Quantity,rent}= request.body
    let updateQuery = "update book_details set book_title=?,author_name=?,Quantity=?,rent_fee=? where book_id=?";
    db.query(updateQuery,[bookname,author,Quantity,rent,id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})

//Delete one member with id
expressfun.post("/deleteUser",(request,response) => {
    let id = request.body.id

    let deleteQuery = "delete from user_details where user_id=?";
    db.query(deleteQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
            console.log(result);
        }
    })
})

//Delete book with id
expressfun.post("/deleteBook",(request,response) => {
    let id = request.body.id

    let deleteQuery = "delete from book_details where book_id=?";
    db.query(deleteQuery,[id],(error,result) => {
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
            console.log(result);
        }
    })
})


expressfun.listen(8000,() => {
    console.log("your port running in 8000");
})