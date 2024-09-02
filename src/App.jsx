import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

      { !loading ? <div className='flex-grow'>Outlet</div> : 
        <div>Loading ....</div>
      }

      <Footer />
    </div>
  )

}

export default App
