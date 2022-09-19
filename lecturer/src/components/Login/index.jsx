import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

const Login = () => {
    const [data, setData] = useState({
        username:"",
        password:""
    });

    const [error, setError] = useState("");
    
    const handleChange = ({currentTarget: input })=>{
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/lecturer/login";
            const response = await axios.post(url, data);
            const {token, user, message} = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.username);
            localStorage.setItem('courseCode', user.courseCode);
            window.location = "/"
        } catch (error) {
            if(
                error.response &&
                error.response.status >= 400 && 
                error.response.status <= 500
            ){
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <div className={styles.auca_logo}></div>
                    <h1>AUCA CLAIMING SYSTEM</h1>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h4>Lecturer</h4>
                        <h1>SIGN IN</h1>
                        <input 
                            type="text" 
                            className={styles.input} 
                            placeholder="Username"
                            name='username'
                            onChange={handleChange}
                            value={data.username} 
                            required   
                        />
                        <input 
                            type="password" 
                            className={styles.input} 
                            placeholder="Password"
                            name='password'
                            onChange={handleChange}
                            value={data.password} 
                            required   
                        />
                        { error && <div className={styles.error_msg}>{error}</div> }
                        <button type='submit' className={styles.green_btn}>Sign In</button>
                    </form>
                    <div className={styles.bottom}>
                        <span className='already_have_account'>New Here? <Link to='/signup' className={styles.links}>Sign Up</Link></span>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Login