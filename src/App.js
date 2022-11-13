import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Layout from "./routes/Layout";
import About from "./routes/About";
import Login from "./routes/Login";
import UserContextProvider from "./components/userContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./routes/Register";
import Notes, {loader as notesLoader} from "./routes/Notes";
import AddNote from "./routes/AddNote";
import ChangeNote, {loader as changeNoteLoader} from "./routes/ChangeNote";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <About/>,
      },
      {
        path: "/notes/:email",
        element: <Notes/>,
        loader: notesLoader,
      },
      {
        path: "/notes/add",
        element: <AddNote/>,
      },
      {
        path: "/notes/:email/:noteId",
        element: <ChangeNote/>,
        loader: changeNoteLoader,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>
  }
])

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  )
}

export default App;
