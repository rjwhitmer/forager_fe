import React from 'react'
import Image from './Image'

export default class Plant extends React.Component{

    state = {
        pictureIsFocused: false
    }

    handlePercent = (number) => {
        return(Math.round(number * 100))
    }

    handlePictures = (pictures) => {
        return pictures.map(picture => {
            return <Image 
                        handleFocusPicture={this.handleFocusPicture}
                        handlePercent={this.handlePercent}
                        pictureIsFocused={this.state.pictureIsFocused}
                        picture={picture}
                        plant={this.props.plant}
                    />
        })
    }

    handleClick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.props.addUserPlants(this.props.plant)
    }

    render(){
        return (
            <div className='plant-card'>
                {(!this.props.plant.plant_details.common_names)
                ? <h4>{this.props.plant.plant_name}</h4>
                : <h4>{this.props.plant.plant_details.common_names[0]}</h4>}
                <p>Probability: {this.handlePercent(this.props.plant.probability)}%</p>
                {(!this.props.plant.similar_images.length > 0)
                ? <h4>No Images Available!</h4>
                : <>{this.handlePictures(this.props.plant.similar_images)}</>
                }
                <button onClick={this.handleClick}>Got it!</button>
            </div>
        )}
}