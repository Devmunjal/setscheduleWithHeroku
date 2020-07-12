import React, { Component } from 'react';

import Modal from './modal';
import User from './user';
import Main from './sidebar';
import Modal2 from './modal2';
import './scss/compilation.scss'
class Compilation extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            form:false,
            data:[]
        }
    }
 handleModal=(d)=>{
     this.setState({
         data:d
     },()=>{
         console.log(this.state.data);
     })
        this.setState({
            show:!this.state.show
        })
    }
handleForm=()=>{
    alert("welcome to our scheduler You have to add 5 rows to decide Your traning schedule");
    this.setState({
        form : true
    })
}
handle=()=>{
    this.setState({
        form:false
    })
}
    render() {
        console.log(this.state);
        return (
            <div className='compilation' style={{alignItems:'center'}}>
                {this.state.form &&<Modal2 handle={this.handle}/>}
                {this.state.show && <Modal data={this.state.data} handleModal={this.handleModal} />}
                <Main handleForm={this.handleForm} />
                <div className="compilationUser" >
                     <User handleModal = {this.handleModal} />
                </div>
            </div>
        );
    }
}

export default Compilation;