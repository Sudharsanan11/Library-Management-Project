import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

export function AdminDashBoard(){
    return(
        <>
            <div className="admin">
                <div>
            <Card className="p-3" style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title className="mb-4">Admin DashBoard</Card.Title>
                <Link className="btn btn-secondary mb-2" to="/addUser">Add Member</Link><br/>
                <Link className="btn btn-secondary mb-2" to="/addBook">Add Book</Link><br/>
                <Link className="btn btn-secondary mb-2" to="/issueBook">Issue Books</Link><br/>
                <Link className="btn btn-secondary mb-2" to="/showUser">Show Users</Link><br/>
                <Link className="btn btn-secondary mb-2" to="/showBook">Show Books</Link><br/>
                <Link className="btn btn-secondary" to="/showIssuedBook">Show Issued Books</Link>
      </Card.Body>
    </Card>
            </div>
            </div>
        </>
    );
}