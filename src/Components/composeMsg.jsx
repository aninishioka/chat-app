import React, { Component } from 'react';
import './CSS/ComposeMsg.css'

class ComposeMsg extends Component {
    state = {  };

    render() { 
        return (
            <div id='composeMsg' className='input-group'>
                <textarea className='composeMsg__input form-control rounded-pill' aria-label='text input' placeholder='Message' rows='1'></textarea>
                <button className='composeMsg__sendButton btn' type='submit'>
                    <span className="material-symbols-outlined">arrow_circle_up</span>
                </button>
            </div>
        );
    }
}
 
export default ComposeMsg;