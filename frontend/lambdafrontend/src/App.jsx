import { Home } from "./components/home/Home";
import { Posts } from "./components/posts/Posts";
import { Login } from "./components/login/Login";
import { Signup } from "./components/signup/Signup";
import { Profile } from "./components/Profile/Profile";
import { SinglePost } from "./components/singlePost/SinglePost";
import { AddPost } from "./components/postform/AddPost";
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
    element: <ProtectedRoute component={AddPost} />,
  },
  {
    path: "/editprofile",
    element: <ProtectedRoute component={ProfileForm} />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
