import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const isUserLoggedIn = useSelector( state => state.auth.isLoggedIn );

    useEffect(() => {
        if (isUserLoggedIn && isUserLoggedIn !== authentication) {
            navigate('/login');
        } else if (!isUserLoggedIn && isUserLoggedIn !== authentication) {
            navigate('/');
        }
        setLoading(false);
    }, [isUserLoggedIn, authentication, navigate])

  return !loading ? ( <>{children}</> ) : (
    <div className="flex justify-center items-center space-x-4">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
        <span className="text-4xl font-bold text-blue-800">Loading...</span>
    </div>
  )
}

export default Protected