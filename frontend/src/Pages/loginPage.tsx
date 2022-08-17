import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../StyleSheet/style.scss'
import { Login } from '../../queries/userQueries'
import { useMutation } from '@apollo/client';

export default function LoginPage(){
    const [loginUser] = useMutation(Login);
    const navigate = useNavigate();
    const login = () =>{
        loginUser(
            {
                variables:{
                    email: (document.getElementById("email") as HTMLInputElement).value,
                    password: (document.getElementById("password") as HTMLInputElement).value}
            }
        ).then(()=>{
            console.log("sudah login")
        }).catch((err)=>{
            console.log("tidak bisa login")
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
                    <p className='text-black'>New to LinkhedIn?</p>
                    <Link className='a' to='/register'>Sign Up</Link>
                </div>          
            </div>
        </div>
    ) 
}