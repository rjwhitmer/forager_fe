import React from 'react'

export default class Login extends React.Component{
    state = {
        username: '',
        password: '',
    }

    handleChange = (event) => {
        if (event.target.name === 'username')
            this.setState({ username: event.target.value })
        else 
            this.setState({ password: event.target.value })
    }
    
    render(){
        return (
            <form className='login'>
                <input 
                    type='text' 
                    placeholder='Username' 
                    name='username'
                    onChange={this.handleChange}
                />
                <input 
                    type='password' 
                    placeholder='Password' 
                    name='password'
                    onChange={this.handleChange}
                />
                <button className='myButton' type='submit' onClick={e => this.props.handleLogin(e, this.state)}>Log-In!</button>
                <button type='submit' onClick={e => this.props.handleSignup(e, this.state)}>Sign-up!</button>
            </form>
        )
    }
}