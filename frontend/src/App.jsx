import "./App.css";
import BackButton from "./components/ui/BackButton";
// import DarkMode from "./components/ui/DarkMode";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlogs from "./pages/CreateBlogs";
import DeleteBlog from "./pages/DeleteBlog";
import EditBlog from "./pages/EditBlog";
import Nav from "./components/ui/Nav";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import LogoutButton from "./components/LogoutButton";
import SearchResults from "./components/SearchResults";
import BlogDetail from "./components/home/BlogDetail";
import UserProfile from "./components/home/UserProfile";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <div className="">
        {/* <BackButton className="" /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/create" element={<CreateBlogs />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/blogs/delete/:id" element={<DeleteBlog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<LogoutButton />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      {/* <Nav /> */}
    </>
  );
}

export default App;
