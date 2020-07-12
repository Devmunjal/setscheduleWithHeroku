import React, { Component } from 'react';
import './scss/sidebar.scss';

class Main extends Component {
    
    render() {
        console.log(this.props);
        return (
            <div className="sidebar">
                <div className='tabdiv'>
                    
                    <span className='tabs'>
                        Sheduled Traning
                    </span>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p className='tabs' onClick={this.props.handleForm}>
                            Schedule A Traning
                    </p>
                    </div> 

            </div>
        );
    }
}

export default Main;