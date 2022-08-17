import { useMutation, useQuery } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import '../StyleSheet/style.scss'
import { Register } from '../../queries/userQueries'
import { useState } from 'react';

export default function RegisterPage(){
    const [registerAccount] = useMutation(Register);
    const [Error, setError] = useState(false);
    const navigate = useNavigate();

    const register = () =>{
        registerAccount(
            {
            variables:{
                email: (document.getElementById("email") as HTMLInputElement).value,
                first_name: (document.getElementById("first_name") as HTMLInputElement).value,
                last_name: (document.getElementById("last_name") as HTMLInputElement).value,
                password: (document.getElementById("password") as HTMLInputElement).value}
            }
        ).then(()=>{
            setError(false);
            navigate('/');
        }).catch((err)=>{
           setError(true); 
        });
    }

    return(
        <div className="white-bg fullscreen center-all">
            <img src="../assets/logo.png" className='logo' alt="" />
            <div className='form white-bg'>
                <div className='form-label-container'>
                    <h2 className='text-black'>Sign Up</h2> 
                </div>
                <input id="first_name" type="text" className='white-bg text-input' placeholder='First Name' />           
                <input id="last_name" type="text" className='white-bg text-input' placeholder='Last Name' />           
                <input id="email" type="email" className='white-bg text-input' placeholder='Email or Phone' />           
                <input id="password" type="password" className='white-bg text-input' placeholder='Password (6 or more characters)' />
                <button onClick={register} className='blue-button'>Sign Up</button>
                <div className='w-fit flex-row'>
                    <p className='text-black'>Already have a LinkhedIn Account?</p>
                    <Link className='a' to='/'>Sign In</Link>
                </div> 
                {Error ===true && (
                    <p className='text-black'>Email Already Exists</p>
                )} 
            </div>
        </div>
    )
}