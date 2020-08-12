import React from 'react'

export default function UserPlants(props){

    const showUserPlants = () => {
        return props.plants.map(plant => {
            return(
                <div className='user-plant-card'>
                    <h4>{plant.name}</h4>
                    <img src={plant.first_similar_image} />
                    <p>{plant.description}</p>
                    <a href={plant.wiki_url}>More Info!</a>
                </div>
            )
        })
    }
    return (
        <>
            <h1 className='site-banner'>Here are your plants!</h1>
            <div className='user-plant-container'>
                {showUserPlants()}
            </div>
        </>
    )
}