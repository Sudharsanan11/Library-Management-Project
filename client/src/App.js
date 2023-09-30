import logo from './logo.svg';
import './App.css';
import { Login } from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Adduser } from './components/user_details/adduser';
import { AdminDashBoard } from './components/adminDashBoard';
import { Issuebook } from './components/issuebook.js/issuebook';
import { ShowUsers } from './components/user_details/showUser';
import { ShowBooks } from './components/book_details/showBooks';
import { ShowIssuedBooks } from './components/issuebook.js/showIssuedBooks';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { AddBook } from './components/book_details/addBook';
import { UpdateUser } from './components/user_details/updateUser';
import { UpdateBook } from './components/book_details/updateBook';
import loginimg from './components/assects/img1.avif'
import 'react-bootstrap/dist/react-bootstrap'
import './components/user_details/user.css'
import './components/book_details/book_details.css'
import './components/issuebook.js/issue.css'


function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/adminDashBoard' element={<AdminDashBoard/>}/>
              <Route path='/addUser' element={<Adduser/>}/>
              <Route path='/addBook' element={<AddBook/>}/>
              <Route path='/issueBook' element={<Issuebook/>}/>
              <Route path='/showUser' element={<ShowUsers/>}/>
              <Route path='/updateUser/:id' element={<UpdateUser/>}/>
              <Route path='/showBook' element={<ShowBooks/>}/>
              <Route path='/updateBook/:id' element={<UpdateBook/>}/>
              <Route path='/showIssuedBook' element={<ShowIssuedBooks/>}/>
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
