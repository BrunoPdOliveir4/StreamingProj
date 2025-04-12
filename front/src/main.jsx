import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Cadastro } from './pages/Cadastro.jsx';
import { Login } from './pages/Login.jsx';
import { MainPage } from './pages/MainPage.jsx';
import AnimePage from './pages/AnimePage.jsx';
import { Category } from './pages/Category.jsx';
import { CategoryPage } from './pages/CategoryPage.jsx';
import { AnimeFinder } from './pages/AnimeFinder.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <MainPage />
  },
  {
    path: '/animeDetail',
    element: <AnimePage />
  },
  {
    path: '/categories',
    element: <Category />
  },
  {
    path: '/category',
    element: <CategoryPage />
  },
  {
    path: '/animeFinder',
    element: <AnimeFinder />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
    
    
  </StrictMode>,
)
