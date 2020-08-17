import React from 'react'

export default class UserPlants extends React.Component {
    state = {
        isClicked: false
    }

    handleRecipeClick = (event) => {
        event.stopPropagation()
        this.props.recipeClick(this.props.plant.name)
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    showUserPlants = () => {
        if (this.props.plant)
            return(
                <div
                className={this.state.isClicked ? 'clicked-user-plant-card' : 'user-plant-card'}
                onClick={this.handleRecipeClick}>
                    <h4>{this.props.plant.name}</h4>
                    <img alt="" src={this.props.plant.first_similar_image} />
                    <a href={this.props.plant.wiki_url}>More Info!</a>
                </div>
            )
        else return null
    }
    render(){
        return (
            <>
                <div className='user-plant-container'>
                    {this.showUserPlants()}
                </div>
            </>
        )
    }
}