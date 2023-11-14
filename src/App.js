import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Layout from "./layout/Layout";
import FeedBack from "./screens/FeedBack";
import FeedBackListing from "./screens/FeedBackListing";
import AdminFeedBackListing from "./screens/admin/FeedBackListing";
import Users from "./screens/admin/Users";

function App() {
  // For Admin 
  const userData = JSON.parse(localStorage.getItem('user'));
  const isAdmin =
  userData &&
  userData.email === 'dar@gmail.com' &&
  userData.password === '12345';

  return (
    <BrowserRouter>
   <Layout>
        <Routes>
          <Route path="/login" element={<Login />} layout="pdf" />
          <Route path="/register" element={<SignUp />} layout="pdf" />
          <Route path="/feedback" element={<FeedBack />}  layout="default"/>
          <Route path="/feedback/listing" element={<FeedBackListing />}  layout="default"/>
         {/* Conditional rendering based on admin status */}
         {isAdmin && (
            <Route path="user" element={<Users />} layout="default" />
          )}

          {isAdmin && (
            <Route path="/admin/feedback/listing" element={<AdminFeedBackListing />} layout="default" />
          )}
        </Routes>
   </Layout>

    </BrowserRouter>
  );
}

export default App;
