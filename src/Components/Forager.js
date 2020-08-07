import React from 'react'
import Login from './Login'
import Plant from './Plant'
import Recipe from './Recipe'
import Camera from './Camera'

const plantAPI = 'https://api.plant.id/v2/identify'

export default class Forager extends React.Component {
    state = {
        isLoggedIn: false,
        picture: ""
    }

    handleLogin = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        })
    }

    handleCapture = (image) => {
        this.setState({
            picture: image
        })
        this.plantFetch()
    }

    plantFetch = () => {
        let image = this.state.picture
        let data = {
            api_key: process.env.REACT_APP_PLANT_API_KEY,
            images: image,
            modifiers: ["crops_fast", "similar_images"],
            plant_language: "en",
            plant_details: [
                "common_names",
                "url",
                "name_authority",
                "wiki_description",
                "synonyms"
            ]
        }
        fetch(plantAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        // .then(response => response.json())
        // .then(data => console.log('success!', data))
        .catch((error) => {
            console.error('Error: ', error)
        })
    }

    render(){
        return (
            <div>
                {(!this.state.isLoggedIn)
                ? <Login handleLogin={this.handleLogin}/>
                : 
                <>
                    <button onClick={this.handleLogin}>Log Out</button>
                    <Camera handleCapture={this.handleCapture}/>
                    <Plant />
                    <Recipe />
                </>
                }
            </div>
        )
    }
}