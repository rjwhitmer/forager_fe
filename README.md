# Forager

## Table of contents

- [](#)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Intro Video](#intro-video)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Code Examples](#code-examples)
  - [Features](#features)
  - [Status](#status)
  - [Inspiration](#inspiration)
  - [Contact](#contact)

## General Info

Forager is a website that allows a user to identify a plant, and then checks to see if there are any recipes that include that plant!

## Intro Video

<!-- [Mod 3 Flatiron Project by Bob Whitmer](https://youtu.be/PoxeLCi_3M8) -->
Video coming soon!

## Technologies

* Python - 3.7.7
* Django - 3.1
* Django REST Framework - 3.11.1
* SQLite3 - version 1.4
* JWT
* JavaScript
* React 16.8
* CSS

## Setup

To view this project, visit https://rjwhitmer-capstone.web.app

## Code Examples

Find the plant you took a picture of:
```JavaScript
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
```

Highlight a plant to find the recipe:
```JavaScript
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
    let filteredPlants = this.state.selectedPlants.filter(filteredPlant=> {
        return filteredPlant !== plant
    })
    this.setState({
        selectedPlants: filteredPlants
    })
}
```

## Features

* Take a picture of anything
* Use AI to guess what the plant is
* Save plant guesses
* Find recipes with plants you have found
* Full auth with login and logout capabilitites

## To-do List

* Refactor “code smell”
* Save recipes
* Allow picture upload so you don't have to take a picture
* Integrate map functionality

## Status

Project is: finished with option to expand functionality and DRY out code.

## Inspiration

I have an extensive background in cooking. I also love the outdoors! This was a great way to combine my two loves, and to show off some skills.

## Contact

Created by [Bob Whitmer](https://www.linkedin.com/in/bob-whitmer-b7269248/)
Feel free to contact me!