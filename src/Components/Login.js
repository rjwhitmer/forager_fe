import React from 'react'

export default function Login(props){
    return (
        <form>
            <p>This is the login form</p>
            <button type='submit' onClick={props.handleLogin}>Log-In!</button>
        </form>
    )
}