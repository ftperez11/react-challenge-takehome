import React from "react";
import Card from "./components/Card"

const cards = Array(16).fill(1).map(card => ({
    currentIndex: -1
}))

const oldState = {
    Cards: cards,
    colors:["red", "green", "blue"],
    currentColorIndex: -1,
    redCount: 0,
    blueCount: 0,
    greenCount: 0,
    unassignedCount: 16,
}
class App extends React.Component {
    userData;
    constructor(props){
        super(props)
        this.state = {
            Cards: cards,
            colors:["red", "green", "blue"],
            currentColorIndex: -1,
            redCount: 0,
            blueCount: 0,
            greenCount: 0,
            unassignedCount: 16,
        }
        this.updateColorCount = this.updateColorCount.bind(this)
        this.handleChangeClassOnClick = this.handleChangeClassOnClick.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    componentDidMount() {
       this.userData = JSON.parse(localStorage.getItem('user'));
       if(localStorage.getItem('user')){
           this.setState({
                Cards: this.userData.Cards,
                colors:this.userData.colors,
                currentColorIndex: this.userData.currentColorIndex,
                redCount: this.userData.redCount,
                blueCount: this.userData.blueCount,
                greenCount: this.userData.greenCount,
                unassignedCount: this.userData.unassignedCount
           })
       } else {
           this.setState({
            Cards: cards,
            colors:["red", "green", "blue"],
            currentColorIndex: -1,
            redCount: 0,
            blueCount: 0,
            greenCount: 0,
            unassignedCount: 16,
           })
       }
    }
    
    
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }
    
    updateColorCount(colorIndex){
        var lastColorIndex = colorIndex
       
            if(lastColorIndex === -1){
                this.setState({
                    redCount: this.state.redCount+1,
                    unassignedCount: this.state.unassignedCount - 1
                })
            } else if (lastColorIndex === 0){
                this.setState({
                    redCount: this.state.redCount-1,
                    greenCount: this.state.greenCount+1
                })
            } else if (lastColorIndex === 1){
                this.setState({
                    greenCount: this.state.greenCount-1,
                    blueCount: this.state.blueCount+1
                })
            } else if (lastColorIndex === 2){
                this.setState({
                    redCount: this.state.redCount+1,
                    blueCount: this.state.blueCount-1
                })
            } 
    }
        
    handleChangeClassOnClick(i){
            const tempIndex = this.state.Cards[i].currentIndex === -1 ? 0 : ((this.state.Cards[i].currentIndex + this.state.colors.length + 1) % (this.state.colors.length))
            const newCards = this.state.Cards.slice()
            newCards[i] = {
                currentIndex: tempIndex
            }
            this.setState({
                Cards: newCards
            })
    }
   
    handleReset(){
        this.setState(oldState)
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <h1>Welcome To Color Count Counter</h1>
                </header>
                <div className="counter-container">
                    <span className="color-counter">RED: {this.state.redCount} </span>
                    <span className="color-counter">BLUE: {this.state.blueCount} </span>
                    <span className="color-counter">GREEN: {this.state.greenCount} </span>
                    <span className="color-counter">UNASSIGNED: {this.state.unassignedCount} </span>
                    <button className="color-counter" onClick={this.handleReset}>Reset Colors</button>
                </div>
                <div className="app-card-list">
                    {this.state.Cards.map((card,index) => {
                        return <Card key={index} card={card}  colorIndex={card.currentIndex} colors={this.state.colors} index={index} handleChangeClassOnClick={this.handleChangeClassOnClick} updateColorCount={this.updateColorCount}/>
                    })}
                </div>
            </div>
        );
    }
}

export default App;
