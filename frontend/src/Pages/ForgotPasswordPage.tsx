import { useMutation } from '@apollo/client';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendResetPassLink } from '../../queries/userQueries';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [sendReset] = useMutation(sendResetPassLink);

  const sendResetLink = () =>{
    const email = (document.getElementById("email") as HTMLInputElement).value
    sendReset({variables:{email:email}}).then(()=>{
            navigate('/');
        }
    ).catch((err)=>{
        console.log(err);
    })
  }
  

  return (
    <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container'>
                    <h2 className='text-black mb-10'>Forgot Password?</h2> 
                </div>
                <div className='form-label-container'>
                    <h4 className='text-black'>Reset password in two quick steps</h4> 
                </div>
                <input id='email' type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <button onClick={sendResetLink}className='blue-button'>Sign In</button>  
                <button onClick={()=>{navigate('/')}} className='blue-button'>Back</button>  
            </div>
        </div>
  )
}