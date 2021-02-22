import React, { Component } from 'react'

export class Card extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render() {
        const newClassName = this.props.colorIndex > -1 ? `card ${this.props.colors[this.props.colorIndex]}` : "card";
        return (
            
           <div className={newClassName}
                onClick={() => {
                    this.props.handleChangeClassOnClick(this.props.index)
                    this.props.updateColorCount(this.props.colorIndex)
                }}> 
                <h1>I am a card</h1> 
            </div>
        
        )
    }
}

export default Card
