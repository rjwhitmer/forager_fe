import '../App.css';
import React from 'react'
import Login from './Login'
import Plant from './Plant'
import Recipe from './Recipe'
import Camera from './Camera'
import UserPlants from './UserPlants'

const plantAPI = 'https://api.plant.id/v2/identify'
const userURL = 'http://localhost:8000/users/1'

export default class Forager extends React.Component {
    state = {
        isLoggedIn: false,
        picture: "", 
        plantGuesses: [],
        showCamera: false,
        userPlants: [],
    }
    
    componentDidMount = () => {
        this.getUserPlants()
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
        this.plantFetch(image)
    }


    getUserPlants = () => {
        fetch(userURL)
        .then(response => response.json())
        .then(data => this.handleUserPlants(data))
    }

    handleUserPlants = (data) => {
        this.setState({
            userPlants: data
        })
    }

    addUserPlants = (plant) => {
        console.log(plant)
    }

    plantFetch = (image) => {
        let data = {
            api_key: process.env.REACT_APP_PLANT_API_KEY,
            images: [image],
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
        .then(response => response.json())
        .then(data => this.handlePlantGuesses(data))
        .catch((error) => {
            console.error('Error: ', error)
        })
    }

    handlePlantGuesses = (plantData) => {
        this.setState({
            plantGuesses: plantData.suggestions
        })
    }

    showPlantGuesses = () => {
        if (this.state.showCamera) {
            return this.state.plantGuesses.map(plantGuess => {
                return <Plant 
                    key={plantGuess.id} 
                    plant={plantGuess} 
                    addUserPlants={this.addUserPlants}
                    />
            })
        } else return null
    }

    handleShowCamera = () => {
        this.setState({
            showCamera: !this.state.showCamera
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
                    <button onClick={this.handleShowCamera}>Camera On/Off</button>
                    {this.state.showCamera 
                    ? <Camera handleCapture={this.handleCapture}/> 
                    : 
                    <div className='user-recipe-user-plant-container'>
                        <UserPlants 
                            plants={this.state.userPlants.plants}/>
                        <Recipe />
                    </div>}
                    <div className='plant-card-container'>
                        {(this.state.plantGuesses.length > 0) ? this.showPlantGuesses() : null}
                    </div>
                </>
                }
            </div>
        )
    }
}