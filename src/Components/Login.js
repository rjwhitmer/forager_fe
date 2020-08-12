import React from 'react'

export default function Login(props){
    return (
        <form className='login'>
            <p>This is the login form</p>
            <input type='text' placeholder='Username' name='username' />
            <input type='password' placeholder='Password' name='password' />
            <button type='submit' onClick={props.handleLogin}>Log-In!</button>
        </form>
    )
}