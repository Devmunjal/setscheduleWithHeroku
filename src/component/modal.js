import React, { Component } from 'react';
import './scss/modal.scss';


class Modal extends Component {
    constructor(props){
        super(props);
    }
 
    render() {
        const topics = this.props.data.taskPerformed
        console.log(topics);
        return (
            <div>
                {this.props.data && <div className='overlay1' onClick={this.props.handleModal}>
                    <div className='contain1'>
                       <div style={{float:'right',zIndex:'1',position:'fixed',marginLeft:'75%'}} >
                            <span className='cross1'  onClick={this.props.handleModal}>
                                    &#x2613;
                            </span>
                        </div>
                        {this.props.data && <div className="mainDiv"><div className="headingDiv">
                            <h3 className='heading'>{this.props.data.title}</h3>
                        </div>
                        <hr></hr>
                        <div className="row container date" >
                            <h5>Date :</h5>
                            <p >{this.props.data.date}</p>
                         </div>   
                        <div className="row container timing">
                            <div className="column start">
                                <h6 >Starting Time :</h6>
                                <p>{this.props.data.startTime}</p>
                            </div>
                            <div className="column end" >
                                <h6 >End Time :</h6>
                                <p>{this.props.data.endTime}</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="container" >
                            {
                                this.props.data.taskPerformed.map(task=>{
                                    const topics=task.topicsCovered.split(",");
                                    return(
                                    <div>
                                    <div className='row'><div className="column" style={{width:'50%'}}>
                                                <p style={{display:'inline-block'}} >{task.startTiming}&nbsp;&nbsp;&nbsp;&#8594; </p>
                                                <p style={{display:'inline-block',marginLeft:'50px',width:'20%'}}>{task.heading}</p>
                                           </div>
                                           <div className="column" style={{width:'30%'}}>
                                               <ul>
                                                   {
                                                       topics.map((topic,index)=>{

                                                           return(<li  style={{listStyleType:'none'}}>
                                                               {topic}
                                                           </li>)
                                                       })
                                                   }
                                               </ul>
                                            </div>

                                            </div>
                                            <hr></hr>
                                            </div>)
                                })
                            }
                        </div>
                        </div>}
                    </div>
                </div>}
            </div>
        );
    }
}

export default Modal;