import React, { Component } from 'react';
import Finalform from './fianlform';
import './scss/modal2.scss';
class Modal2 extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="overlay">
                    <div style={{width:'90%',backgroundColor:'#f1f1f1',height:'80%',display:'block',alignItems:'center',marginLeft:'auto',marginRight:'auto',zIndex:'2',marginTop:'5%',overflowY:'auto',paddingTop:'1%',paddingBottom:'2%',borderRadius:'25px',overflowX:'hidden'}}>
                    <span style={{float:'right',marginTop:'1%',marginLeft:'80%',position:'fixed',zIndex:'1',fontWeight:'bold'}} onClick={this.props.handle}>
                            &#x2613;
                      </span>
                    <div className="container-fluid">
                        <Finalform handle={this.props.handle} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal2;