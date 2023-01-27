import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Posts from "./pages/posts";
import CreatePost from "./pages/create-post";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/create",
    element: <CreatePost />,
  },
]);

export default router;
