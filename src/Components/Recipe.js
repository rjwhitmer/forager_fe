import React from 'react'

export default function Recipe(props){
    return (
        <div className='user-recipe-card'>
            <h1>{props.recipe.title}</h1>
            <img alt='' src={props.recipe.image} />
            <a href={props.recipe.sourceUrl}>Check it out!</a>
        </div>
    )
}