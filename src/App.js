import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import BookAddForm from "./components/BookForms/BookAddForm";
import BookDetail from "./components/BookDetail/BookDetail";
import BookEditForm from "./components/BookForms/BookEditForm";
import SignUpForm from "./components/UserAuthForms/SignUpForm";
import SignInForm from "./components/UserAuthForms/SignInForm";
import { checkAuthLoader } from "./components/utils";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: checkAuthLoader,
      element: <Navigation />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "book/add", element: <BookAddForm /> },
        { path: "book/:title", element: <BookDetail /> },
        { path: "book/:title/edit", element: <BookEditForm /> },
      ],
    },
    { path: "auth/signup", element: <SignUpForm /> },
    { path: "auth/signin", element: <SignInForm /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
