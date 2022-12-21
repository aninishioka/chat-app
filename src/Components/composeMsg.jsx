import React, { Component } from 'react';

class ComposeMsg extends Component {
    state = {  };

    render() { 
        return (
            <div className='composeMsg input-group'>
                <textarea className='input-group' aria-label='text input' placeholder='Message'></textarea>
                <button className='btn btn-primary'>Send</button>
            </div>
        );
    }
}
 
export default ComposeMsg;