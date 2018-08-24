import React from 'react'
import fetch from 'cross-fetch'

export default class extends React.Component {
    constructor() {
       super();

       this.state = {
           count: 42
       };

       this.increment = () => {
           this.setState({
               count: this.state.count + 1
           })
       };

       this.decrement = () => {
           this.setState({
               count: this.state.count - 1
           })
       };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:9090');
        const initialCount = await response.json();

        this.setState({
            count: initialCount
        })
    }

    render() {
        return (
            <div>
                <div className="counter">{this.state.count}</div>
                <button className="increment" onClick={this.increment}/>
                <button className="decrement" onClick={this.decrement}/>
            </div>
        )
    }
}