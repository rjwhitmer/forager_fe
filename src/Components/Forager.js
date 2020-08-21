import '../App.css';
import React from 'react'
import Login from './Login'
import Plant from './Plant'
import Recipe from './Recipe'
import Camera from './Camera'
import UserPlants from './UserPlants'

const recipeAPIKey = process.env.REACT_APP_RECIPE_API_KEY

const plantAPI = 'https://api.plant.id/v2/identify'
const userURL = 'http://localhost:8000/forager/users/'
// const authURL = 'http://localhost:8000/token-auth/'

export default class Forager extends React.Component {
    
    state = {
        username: '',
        // isLoggedIn: localStorage.getItem('token') ? true : false,
        isLoggedIn: false,
        picture: "", 
        plantGuesses: [],
        showCamera: false,
        userPlants: [],
        selectedPlants: [],
        userRecipes: [],
    }
    
    componentDidMount = () => {
        this.getUserPlants()
    }

    handleLogin = (event, userData) => {
        event.stopPropagation()
        event.preventDefault()
        // fetch(authURL, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     localStorage.setItem('token', data.token);
        //     this.setState({
        //         isLoggedIn: true,
        //         username: data.user.name
        //     })
        // })

        this.setState({
            isLoggedIn: !this.state.isLoggedIn,
        })
    }

    handleSignup = (event, userData) => {
        event.stopPropagation()
        event.preventDefault()
        fetch(userURL, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            this.setState({
                isLoggedIn: true,
                username: data.user.username
            })
        })
    }

    handleLogout = () => {
        localStorage.removeItem('token')
        this.setState({
            isLoggedIn: false,
            username: ''
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

    handleAddUserPlant = (plant) => {
        let name;
        if (plant.plant_details.common_names)
            name = plant.plant_details.common_names[0]
        else name = plant.name
        const description = plant.plant_details.wiki_description.value
        const wiki_url = plant.plant_details.url
        const first_similar_image = plant.similar_images[0].url
        const second_similar_image = plant.similar_images[1].url
        const plantObject = {
            name,
            description,
            wiki_url,
            first_similar_image,
            second_similar_image
        }

        this.addUserPlants(plantObject)
    }

    addUserPlants = (plantObject) => {
        this.setState({
            showCamera: !this.state.showCamera,
            plantGuesses: [],
            userPlants: [...this.state.userPlants, plantObject]
        })
    }

    recipeClick = (plant) => {
        let isSelected = this.state.selectedPlants.includes(plant)
        !isSelected ? this.addSelectedPlant(plant) : this.removeSelectedPlant(plant)
    }

    addSelectedPlant = (plant) => {
        this.setState({
            selectedPlants: [...this.state.selectedPlants, plant]
        })
    }

    removeSelectedPlant = (plant) => {
        let filteredPlants = this.state.selectedPlants.filter(filteredPlant => {
            return filteredPlant !== plant
        })
        this.setState({
            selectedPlants: filteredPlants
        })
    }

    recipeFetch = () => {
        const recipeAPIURL = `https://api.spoonacular.com/recipes/complexSearch?query=${this.state.selectedPlants}&addRecipeInformation=true&apiKey=${recipeAPIKey}`
        fetch(recipeAPIURL)
        .then(response => response.json())
        .then(data => this.setState({
            userRecipes: data
        }))
        .catch(e => console.log(e))
    }

    handleShowRecipes = () => {
        return this.state.userRecipes.results.map(recipeObject => {
            return <Recipe recipe={recipeObject} />
        })
    }

    clearRecipes = (event) => {
        event.preventDefault()
        this.setState({
            userRecipes: []
        })
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
                    handleAddUserPlant={this.handleAddUserPlant}
                    />
            })
        } else return null
    }

    showUserPlants = () => {
        return this.state.userPlants.map(plant => {
            return <UserPlants 
                    plant={plant} 
                    recipeClick={this.recipeClick}
                    getUserPlants={this.getUserPlants}
                    />
        })
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
                ? <Login handleLogin={this.handleLogin} handleSignup={this.handleSignup}/>
                : 
                <>
                    <nav>
                        <button className='logout' onClick={this.handleLogout}>Log Out</button>
                        <button onClick={this.handleShowCamera}>Camera On/Off</button>
                    </nav>
                    {this.state.showCamera 
                    ? <Camera handleCapture={this.handleCapture}/> 
                    : null }
                    <div className='user-recipe-user-plant-container'>
                        {(this.state.userPlants.length > 0)
                        ? 
                            <div className='user-plants'>
                                <h1 className='banner'>Your plants!</h1>
                                <div className='user-plants-container'>
                                    {this.showUserPlants()}
                                </div>
                                <button onClick={this.recipeFetch}>Find Recipes!</button>
                            </div>
                        : null
                        }

                        {(this.state.userRecipes.results)
                        ?   <div className='user-recipes'>
                                <h1 className='banner'>Yummy recipes!</h1>
                                <div className='user-recipes-container'>
                                    {this.handleShowRecipes()}
                                </div>
                                <button onClick={this.clearRecipes}>Clear Recipes</button>
                            </div>
                        : null
                        }
                    </div>
                    <div className='plant-card-container'>
                        {(this.state.plantGuesses.length > 0) ? this.showPlantGuesses() : null}
                    </div>
                </>
                }
            </div>
        )
    }
}