import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../StyleSheet/style.scss'
import { Login } from '../../queries/userQueries'
import { useMutation } from '@apollo/client';
import { UserAuth } from '../../contexts/authContext';

export default function LoginPage(){
    const userContext = UserAuth();
    const [loginUser] = useMutation(Login);
    const navigate = useNavigate();
    const login = () =>{
        loginUser(
            {
                variables:{
                    email: (document.getElementById("email") as HTMLInputElement).value,
                    password: (document.getElementById("password") as HTMLInputElement).value}
            }
        ).then((x)=>{
            // console.log("sudah login")
            console.log(x.data.Login.user)
            userContext.setUser(x.data.Login.user)
            navigate('/home')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container'>
                    <h2 className='text-black'>Sign In</h2> 
                </div>
                <input id='email' type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <input id='password' type="password" className='white-bg text-input' placeholder='Password' />
                <button onClick={login} className='blue-button'>Sign In</button>  
                <div className='w-fit flex-row'>
                    <p className='text-black'>Forgot Password?</p>
                    <Link className='a' to='/forgotPassword'>Reset Password</Link>
                </div>          
                <div className='w-fit flex-row'>
                    <p className='text-black'>New to LinkhedIn?</p>
                    <Link className='a' to='/register'>Sign Up</Link>
                </div>          
            </div>
        </div>
    ) 
}