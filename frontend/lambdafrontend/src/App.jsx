import { Home } from "./components/home/Home";
import { Posts } from "./components/posts/Posts";
import { Login } from "./components/login/Login";
import { Signup } from "./components/signup/Signup";
import { Profile } from "./components/Profile/Profile";
import { SinglePost } from "./components/singlePost/SinglePost";
import { PostForm } from "./components/postform/PostForm";
import { ProfileForm } from "./components/profileform/ProfileForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/posts",
    element: <ProtectedRoute component={Posts} />,
  },
  {
    path: "/post/:id",
    element: <ProtectedRoute component={SinglePost} />,
  },
  {
    path: "/addpost",
    element: <ProtectedRoute component={PostForm} />,
  },
  {
    path: "/editprofile",
    element: <ProtectedRoute component={ProfileForm} />,
  },
  {
    path: "/myprofile",
    element: <ProtectedRoute component={Profile} />,
  },
  {
    path: "/editpost/:id",
    element: <ProtectedRoute component={PostForm} />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
