import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./LayOuts/AuthLayout";
import MainLayout from "./LayOuts/MainLayout";
import Saved from "./Components/Saved/Saved";
import Community from "./Components/Community/Community";
import Feed from "./Components/Feed/Feed";
import Profile from "./Components/Profile/Profile";
import Notifications from "./Components/Notifications/Notifications";
import AuthContextProvider from "./Context/AuthContext";
import Settings from "./Components/Settings/Settings";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AddComment from "./Components/AddComment/AddComment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsDetails from "./Components/PostsDetails/PostsDetails";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { index: true, element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/profile",element: <ProtectedRoute><Profile /></ProtectedRoute>},
        { path: "/notifications", element: <ProtectedRoute><Notifications /></ProtectedRoute> },
        { path: "/feed", element: <ProtectedRoute><Feed /></ProtectedRoute> },
        { path: "/saved", element: <ProtectedRoute><Saved /> </ProtectedRoute>},
        { path: "/community", element: <ProtectedRoute><Community /></ProtectedRoute> },
        { path: "/setting", element: <ProtectedRoute><Settings /></ProtectedRoute> },
        { path: "/addComment", element: <AddComment /> },
        { path: "/postsDetails/:id", element: <ProtectedRoute><PostsDetails /></ProtectedRoute> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

const client = new QueryClient();

  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
