import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../StyleSheet/style.scss'
import { getUserByEmail, Login, LoginWithoutPassword } from '../../queries/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { UserAuth } from '../../contexts/authContext';
import { lazy, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export default function LoginPage(){
    const userContext = UserAuth();
    const [loginUser] = useMutation(Login);
    const [loginWithoutPassword] = useMutation(LoginWithoutPassword);
    const [Error, setError] = useState('');
    const navigate = useNavigate();
    const [getUserEmail] = useLazyQuery(getUserByEmail);

    useEffect(() => {
        //@ts-ignore
       google.accounts.id.initialize({
            client_id: "255447368202-hvjtdf5sbkusjjahgclpqcfm4u7c41da.apps.googleusercontent.com",
            callback: googleLogin
          })
      
          // @ts-ignore
          google.accounts.id.renderButton(
            document.getElementById("google-button"),
            {theme: "outline", size: "large"}
          )
    },[])
    

    const googleLogin=(response:any)=>{
        console.log("EncodedToken: "+ response.credentials)
        type User ={
            given_name: String,
            family_name: String,
            email: String,
            token: String
        }
        const user:User = jwtDecode(response.credential)
        console.log(user)
        getUserEmail({variables:{email:user.email}}).then((e)=>{
            console.log(e.data)
            loginWithoutPassword({variables:{email: user.email}}).then((x)=>{
                console.log(x)
                userContext.setUser(x.data.LoginWithoutPassword.user)
                userContext.setToken(x.data.LoginWithoutPassword.token)
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                setError('Please input valid credentials')
            })
        })
    }

    const login = () =>{
        const email = (document.getElementById("email") as HTMLInputElement).value
        const password = (document.getElementById("password") as HTMLInputElement).value
        if(email==='' || password==='' ){
            setError("All fields must be filled");
        }else{
            setError('')
            loginUser(
                {
                    variables:{
                        email: email,
                        password: password
                    }
                }
            ).then((x)=>{
                userContext.setUser(x.data.Login.user)
                userContext.setToken(x.data.Login.token)
                navigate('/home')
            }).catch((err)=>{
                console.log(err)
                setError('Please input valid credentials')
            })
        }
    }

    return(
        <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container'>
                    <p className='text-black text-xl mv-30'>Sign In</p> 
                </div>
                <input id='email' type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <input id='password' type="password" className='white-bg text-input' placeholder='Password' />
                <button onClick={login} className='blue-button text-white'>Sign In</button>  
                <div id='google-button'></div>
                <div className='w-fit flex-row mv-20'>
                    <p className='text-black '>Forgot Password?</p>
                    <Link className='a' to='/forgotPassword'>Reset Password</Link>
                </div>          
                <div className='w-fit flex-row mb-30'>
                    <p className='text-black text-s '>New to LinkhedIn?</p>
                    <Link className='a text-s' to='/register'>Sign Up</Link>
                </div> 
                {Error !='' && (
                    <p className='text-red text-m bold'>{Error}</p>
                )}          
            </div>
        </div>
    ) 
}