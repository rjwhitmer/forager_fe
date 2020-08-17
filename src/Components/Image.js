import React from 'react'

export default class Image extends React.Component{
    state = {
        pictureIsFocused: false
    }

    handleFocusPicture = (event) => {
        event.stopPropagation()
        this.setState({
            pictureIsFocused: !this.state.pictureIsFocused
        })
    }

    render(){
        return (
            <>
                <img 
                    className='small' 
                    onClick={this.handleFocusPicture} 
                    alt={this.props.plant.plant_name} 
                    src={this.props.picture.url} 
                />
                {this.state.pictureIsFocused && (
                    <dialog
                        className='dialog'
                        style={{ position: "relative" }}
                        open
                        onClick={this.handleFocusPicture}
                    >
                        <img
                            className='full-image'
                            src={this.props.picture.url}
                            onClick={this.handleFocusPicture}
                            alt=''
                        />
                    </dialog>
                )}
                <p>Image Similarity: {this.props.handlePercent(this.props.picture.similarity)}%</p>
            </>
        )
    }
    }