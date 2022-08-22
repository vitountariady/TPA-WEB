import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GetLink, resetPassword } from '../../queries/userQueries'

export default function ResetPasswordPage() {  
  const id= useParams().id;
  const navigate = useNavigate();
  const [resetpassword] = useMutation(resetPassword);
  const {loading,error,data} = useQuery(GetLink,{
    variables:{
        id:id
    }
})
  const reset = () =>{
    if(!loading){
        const userid= data.getLink.userID
        const password =  (document.getElementById("password") as HTMLInputElement).value
        const confirmpassword =  (document.getElementById("confirmpassword") as HTMLInputElement).value
        if(password!==confirmpassword){
            console.log("beda")
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
                <div className='form-label-container'>
                    <h2 className='text-black mb-10'>Forgot Password?</h2> 
                </div>
                <div className='form-label-container'>
                    <h4 className='text-black'>Reset password in two quick steps</h4> 
                </div>
                <input id='password' type="password" className='white-bg text-input' placeholder='New Password' />           
                <input id='confirmpassword' type="password" className='white-bg text-input' placeholder='Confirm New Password' />           
                <button onClick={reset} className='blue-button'>Reset Password</button>  
            </div>
        </div>
  )
}
