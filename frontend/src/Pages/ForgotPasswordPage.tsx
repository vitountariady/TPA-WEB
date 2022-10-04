import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendResetPassLink } from '../../queries/queries';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [sendReset] = useMutation(sendResetPassLink);
  const [Error, setError] = useState(false);

  const sendResetLink = () =>{
    const email = (document.getElementById("email") as HTMLInputElement).value
    sendReset({variables:{email:email}}).then(()=>{
            setError(false);
            navigate('/');
        }
    ).catch((err)=>{
        setError(true);
        console.log(err);
    })
  }
  

  return (
    <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container mv-20'>
                    <h2 className='text-black '>Forgot Password?</h2> 
                </div>
                <div className='form-label-container'>
                    <h4 className='text-black'>Reset password in two quick steps</h4> 
                </div>
                <input id='email' type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <button onClick={sendResetLink}className='text-white mb-10 blue-button'>Send Email</button>  
                <button onClick={()=>{navigate('/')}} className='text-white blue-button'>Back</button>  
                {Error && (
                    <p className='text-red text-m mv-20'>Please input a registered email</p>
                )}
            </div>
        </div>
  )
}
