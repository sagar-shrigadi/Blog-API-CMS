import App from "./src/App";
import { ErrorPage } from "./src/component/Error/ErrorPage";
import { AddNewPost } from "./src/component/Pages/AddPost/AddPost";
import { Index } from "./src/component/Pages/Index/Index";
import { Login } from "./src/component/Pages/Login/Login";
import { Post } from "./src/component/Pages/Post/Post";
import { SignUp } from "./src/component/Pages/SignUp/SignUp";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/new", element: <AddNewPost /> },
      { path: "posts/:postId", element: <Post /> },
    ],
  },
];
export default routes;
