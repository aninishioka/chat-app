import React, { Component } from 'react';

class TextBubble extends Component {
    state = { 
        sender: "",
        message: "" 
    } 
    render() { 
        return (
            <div className='textBubble'>
                <p> { this.state.message } </p>
            </div>
        );
    }
}
 
export default TextBubble;
