import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GetLink, resetPassword } from '../../queries/queries'

export default function ResetPasswordPage() {  
  const id= useParams().id;
  const [Error, setError] = useState('');
  const navigate = useNavigate();
  const [resetpassword] = useMutation(resetPassword);
  const {loading,error,data} = useQuery(GetLink,{
    variables:{
        id:id
    }
})
  const reset = () =>{
    if(!loading && !error){
        const userid= data.getLink.userID
        const password =  (document.getElementById("password") as HTMLInputElement).value
        const confirmpassword =  (document.getElementById("confirmpassword") as HTMLInputElement).value
        if(password === '' || confirmpassword === ''){
            setError('All fields must be filled')
        }else if(password!==confirmpassword){
            setError('Both fields must be the same')
        }else{
            resetpassword({variables:{id:userid, newpass:password}}).then(()=>{
                console.log("Udah")
                navigate('/');
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
  }
  return (
    <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container mv-20'>
                    <h2 className='text-black'>Forgot Password?</h2> 
                </div>
                <div className='form-label-container'>
                    <h4 className='text-black'>Reset password in two quick steps</h4> 
                </div>
                <input id='password' type="password" className='white-bg text-input' placeholder='New Password' />           
                <input id='confirmpassword' type="password" className='white-bg text-input' placeholder='Confirm New Password' />           
                <button onClick={reset} className='text-white blue-button mb-20'>Reset Password</button>  
                {Error !='' && (
                    <p className='text-red text-m bold'>{Error}</p>
                )}  
            </div>
        </div>
  )
}
