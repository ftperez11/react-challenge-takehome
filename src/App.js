import React from "react";
import Card from "./components/Card"


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        }
    }
    render() {
        return (
        
            <div>
                <header className="app-header">
                    hello sir
                </header>
                <div className="app-card-list">
                    {this.state.Cards.map((card) => {
                        return <Card/>
                    })}
                </div>
            </div>
        
        );
    }
}

export default App;
