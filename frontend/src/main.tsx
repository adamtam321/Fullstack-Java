import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import AppLayout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomePage from './pages/home.page.tsx';
import UserPage from './pages/user.page.tsx';
import BlogPage from './pages/blog.page.tsx';
import LoginPage from './pages/login.page.tsx';
import RegisterPage from './pages/register.page.tsx';
import TodoPage from './pages/todo.page.tsx';
import { AuthProvider } from './context/auth.context.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "todos",
        element: <TodoPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
