import { useMutation, useQuery } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import '../StyleSheet/style.scss'
import { Register } from '../../queries/queries'
import { useState } from 'react';

export default function RegisterPage(){
    const [registerAccount] = useMutation(Register);
    const [Error, setError] = useState('');
    const navigate = useNavigate();

    const register = () =>{
        const email = (document.getElementById("email") as HTMLInputElement).value
        const first_name = (document.getElementById("first_name") as HTMLInputElement).value
        const last_name =(document.getElementById("last_name") as HTMLInputElement).value
        const password = (document.getElementById("password") as HTMLInputElement).value

        if(email==='' || first_name==='' || last_name ==='' || password==='' ){
            setError("All fields must be filled");
        }else if(password.length<6){
            setError("Password must be at least 6 characters")
        }else{
            setError('')
            registerAccount(
                {
                variables:{
                    email: email,
                    first_name: first_name ,
                    last_name: last_name,
                    password: password,
                    profile_picture_url: "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/profilePictures%2Fdefault.jpg?alt=media&token=10a15675-4c98-454a-8bdd-bc5914611547",
                    activated: false,
                    }
                }
            ).then((x)=>{
                console.log(x);
                setError("");
                navigate('/');
            }).catch((err)=>{
                console.log(err);
               setError("Email already exists"); 
            });
        }
    }

    return(
        <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container'>
                    <p className='mv-30 text-black text-xl'>Sign Up</p> 
                </div>
                <input id="first_name" type="text" className='white-bg text-input' placeholder='First Name' />           
                <input id="last_name" type="text" className='white-bg text-input' placeholder='Last Name' />           
                <input id="email" type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <input id="password" type="password" className='white-bg text-input' placeholder='Password (6 or more characters)' />
                <button onClick={register} className='blue-button text-white'>Sign Up</button>
                <div className='w-fit flex-row mv-20'>
                    <p className='text-black text-s'>Already have a LinkhedIn Account?</p>
                    <Link className='a text-s' to='/'>Sign In</Link>
                </div> 
                {Error !='' && (
                    <p className='text-red bold text-m'>{Error}</p>
                )} 
            </div>
        </div>
    )
}