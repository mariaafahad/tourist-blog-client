import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import HomeDashboard from "./components/DashboardComponents/DashboardHome/HomeDashboard";
import MyBlogs from "./components/DashboardComponents/MyBlogs/MyBlogs";
import AddBlog from "./components/DashboardComponents/AddBlog/AddBlog";
import ManageBlogs from "./components/DashboardComponents/ManageBlogs/ManageBlogs";
import MakeAdmin from "./components/DashboardComponents/MakeAdmin/MakeAdmin";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute>
                <BlogDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path={`/dashboard`} element={<HomeDashboard />} />
            <Route exact path={`/dashboard/myBlogs`} element={<MyBlogs />} />
            <Route exact path={`/dashboard/addBlog`} element={<AddBlog />} />
            <Route exact path={`/dashboard/manageBlogs`} element={<ManageBlogs />} />
            <Route exact path={`/dashboard/makeAdmin`} element={<MakeAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
