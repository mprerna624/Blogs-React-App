import React from 'react'
import authService from '../../appwrite/authService';
import {logout as storeLogout} from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutBtnHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(storeLogout());
                navigate("/");
            })
    }

  return (
    <button type='button' onClick={logoutBtnHandler}>Logout</button>
  )
}

export default LogoutBtn