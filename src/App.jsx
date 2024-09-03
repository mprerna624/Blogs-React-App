import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/authService';
import {login, logout} from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './Components';

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      authService.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col justify-between'>
      <Header />

      { !loading ? <Outlet /> : 
         <div className="flex justify-center items-center space-x-4">
            <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
            <span className="text-4xl font-bold text-blue-800">Loading...</span>
        </div>
      }

      <Footer />
    </div>
  )

}

export default App
