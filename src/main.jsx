import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import  { AddBlog, Blog, EditBlog, Home, LoginPage, MyBlogs, SignupPage } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/my-blogs' element={<MyBlogs />} />
      <Route path='/add-blog' element={<AddBlog />} />
      <Route path='/edit-blog/:slug/:blogId' element={<EditBlog />} />
      <Route path='/blog/:slug/:blogId' element={<Blog />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
