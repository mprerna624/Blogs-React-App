import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import  { AddBlog, AuthLayout, Blog, EditBlog, Home, LoginPage, MyBlogs, SignupPage } from './pages';
import { blogsInfoLoader } from './pages/Home.jsx';
import { userBlogsLoader } from './pages/MyBlogs.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' 
        element={<Home />} 
        loader={blogsInfoLoader}
      />

      <Route path='/login' 
        element={ <AuthLayout authentication={false}>
                    <LoginPage />
                  </AuthLayout>
                }
      />          

      <Route path='/signup' 
        element={ <AuthLayout authentication={false}>
                   <SignupPage />
                  </AuthLayout>
                } 
      />

      <Route path='/my-blogs/:userId' 
        element={ <AuthLayout authentication={true}>
                    <MyBlogs />
                  </AuthLayout>
                } 
        loader={userBlogsLoader}
      />

      <Route path='/add-blog' 
        element={ <AuthLayout authentication={true}>
                    <AddBlog />
                  </AuthLayout>
                } 
      />

      <Route path='/edit-blog/:slug/:blogId' 
        element={ <AuthLayout authentication={true}>
                    <EditBlog />
                  </AuthLayout>
                } 
      />
      
      <Route path='/blog/:slug/:blogId' 
        element={ <AuthLayout authentication={true}>
                    <Blog />
                  </AuthLayout>
                } 
      />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
