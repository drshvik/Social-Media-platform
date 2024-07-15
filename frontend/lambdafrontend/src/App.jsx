import { Home } from "./components/home/Home";
import { Posts } from "./components/posts/Posts";
import { Login } from "./components/login/Login";
import { Signup } from "./components/signup/Signup";
import { Profile } from "./components/Profile/Profile";
import { SinglePost } from "./components/singlePost/SinglePost";
import { AddPost } from "./components/postform/AddPost";
import { EditProfile } from "./components/profileform/EditProfile";
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
    element: <ProtectedRoute component={AddPost} />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
