import React, { Component, Fragment } from 'react';
import './scss/finalform.scss';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead
const client = new ApolloClient({
  uri: 'https://setschedule.herokuapp.com/v1/graphql',
});
class Finalform extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            date:'',
            startTime:'',
            endTime:'',
            count:1,
            taskPerformed:[{
                heading:'',
                startTiming:'',
                topicsCovered:['','','','']
            }]
        }
    }
    
    handleTask=(e,index,index1)=>{
       const task = this.state.taskPerformed[index];
       if (e.target.name==='heading'){
           task.heading=e.target.value
        this.setState({
            [this.state.taskPerformed[index]]:task
        })}
        if(e.target.name==='startTiming'){
            task.startTiming=e.target.value
            this.setState({
                [this.state.taskPerformed[index]]:task
            })}
         if(e.target.name==='topicsCovered'){
             task.topicsCovered[index1]=e.target.value
             this.setState({
                [this.state.taskPerformed[index]]:task
             })

             console.log(this.state);
         }   

    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=> {
        e.preventDefault();
        if(this.state.count<5){
            alert('Add more row')
        }
        else{
        const obj = JSON.stringify(this.state);
        const query = JSON.stringify({
            query: `mutation {
                  insert_traning(objects:{
                    title: "${this.state.title}",
                    date: "${this.state.date}",
                    startTime: "${this.state.startTime}",
                    endTime:"${this.state.endTime}",
                    taskPerformed:{
                        data:[{
                            heading:"${this.state.taskPerformed[0].heading}",
                            startTiming:"${this.state.taskPerformed[0].startTiming}",
                            topicsCovered:"${this.state.taskPerformed[0].topicsCovered}",
                        },{
                            heading:"${this.state.taskPerformed[1].heading}",
                            startTiming:"${this.state.taskPerformed[1].startTiming}",
                            topicsCovered:"${this.state.taskPerformed[1].topicsCovered}",
                        },
                        {
                            heading:"${this.state.taskPerformed[2].heading}",
                            startTiming:"${this.state.taskPerformed[2].startTiming}",
                            topicsCovered:"${this.state.taskPerformed[2].topicsCovered}",
                        },{
                            heading:"${this.state.taskPerformed[3].heading}",
                            startTiming:"${this.state.taskPerformed[3].startTiming}",
                            topicsCovered:"${this.state.taskPerformed[3].topicsCovered}",
                        },{
                            heading:"${this.state.taskPerformed[4].heading}",
                            startTiming:"${this.state.taskPerformed[4].startTiming}",
                            topicsCovered:"${this.state.taskPerformed[4].topicsCovered}",
                        }
                    ]
                    }
                  }
                    ) {affected_rows}
                }
            `
          });
        
          const response =  fetch('https://setschedule.herokuapp.com/v1/graphql', {
            headers: {'content-type': 'application/json'},
            method: 'POST',
            body: query,
          });
          setInterval(()=>{ this.props.handle() }, 1000);
        }
      }
    addmoreRow=(e,index)=>{
       if(this.state.count<5){
        this.setState({
            count:this.state.count+1,
            taskPerformed:[...this.state.taskPerformed,{heading:'',startTiming:'',topicsCovered:['','','','']}]
        },()=>{console.log(this.state)})
       }
       else{
           alert("you cross the row limit");
       }
    }
    removeRow=(e,index)=> {
        this.state.taskPerformed.splice(index,1);
        this.setState({
            count:this.state.count-1,
            taskPerformed:this.state.taskPerformed
        })
        
    } 
    render() {
        return (
            <div className="container finalform">
                <form onSubmit={this.handleSubmit}>
                    <div className='row row1'>
                        <div className='column title'>
                            <label className='lable'>Title :</label>
                        </div>
                        <div className='column input'style={{width:'70%'}}>    
                            <input type='text'  name='title' value={this.state.title} onChange={this.handleChange} placeholder='Add A Suitable Title' required/> 
                        </div>
                    </div>
                    <div className='row row1'>
                        <div className='column title'>
                            <label className='lable'>Date : </label>
                        </div>
                        <div className='column input'style={{width:'70%'}}>    
                            <input  type='date'name='date' value={this.state.date} onChange={this.handleChange} required />
                        </div>
                    </div>
                   <div className="row "  >
                      <div className='column 'style={{alignItems:'center',textAlign:'center',width:'50%'}}> 
                            <label className='lable'>Starting Time : </label>
                            <input type='time'style={{width:'40%',marginLeft:'10px',paddingLeft:'8px',borderRadius:"10px",outlineStyle:'none',border:'1px solid'}} name='startTime' value={this.state.startTime} onChange={this.handleChange} required />
                        </div>
                        <div className='column 'style={{alignItems:'center',textAlign:'center',width:'50%'}}>
                        <label className='lable'>Leave Time : </label>
                            <input type='time'style={{width:'40%',marginLeft:'10px',paddingLeft:'8px',borderRadius:"10px",outlineStyle:'none',border:'1px solid'}} name='endTime' value={this.state.endTime} onChange={this.handleChange}  />
                        </div>
                    </div>
                    <div className="row" >
                        <div className='column'style={{textAlign:'center',width:'100%'}}><h5 style={{fontFamily:'cursive',textAlign:'center'}}>Tasks</h5></div>
                    </div>
                    {
                       this.state.taskPerformed.map((task,index)=>{
                            return(
                                <Fragment key={index}>
                                <div className='container' style={{alignItems:'center'}}>
                                    <div className='row'>    
                                        <div className='column' style={{width:'80%'}}>
                                            <div className='row'style={{width:'100%',alignItems:'center',marginTop:'1%',marginBottom:'1%' ,marginLeft:'3%'  }}>
                                                    <div className='column'style={{width:'30%',alignItems:'center',textAlign:'center'}}>
                                                    <label className='lable'>Heading : </label>
                                                    </div>
                                                    <div className='column'style={{width:'70%'}}>
                                                    <input type='text' style={{width:'100%',paddingLeft:'8px',borderRadius:"10px",outlineStyle:'none',border:'1px solid'}} name='heading' value={this.state.taskPerformed[index].heading}  onChange={(e)=>this.handleTask(e,index)} required />  
                                                    </div>
                                                
                                            </div>
                                            <div className='row'style={{width:'100%',alignItems:'center',marginTop:'1%',marginBottom:'1%',marginLeft:"8%"   }}>
                                                <div className='column'style={{alignItems:'center',textAlign:'center',width:'50%'}}>
                                                <label className='lable'>Starting Time :</label>
                                                <input type='time'style={{width:'45%',marginLeft:'10px',paddingLeft:'8px',borderRadius:"10px",outlineStyle:'none',border:'1px solid'}} name='startTiming' value={this.state.taskPerformed[index].startTiming}  onChange={(e)=>this.handleTask(e,index)} required />
                                                </div>
                                                <div className='column'style={{alignItems:'center',textAlign:'center',width:'50%'}}>
                                                    <div className='row' style={{width:'100%'}}>
                                                        <div className='column 'style={{width:'40%',textAlign:'center',paddingTop:'14%'}}>
                                                            <label className='lable'style={{marginLeft:'12px'}}>Topics Covered : </label>
                                                        </div>

                                                        <div className='column' style={{width:'60%'}}>
                                                                
                                                                {
                                                                    this.state.taskPerformed[index].topicsCovered.map((topics,index1)=>{
                                                                        return(
                                                                            <input type='text'style={{width:'100%',marginBottom:'5px',marginLeft:'10px',paddingLeft:'8px',borderRadius:"10px",outlineStyle:'none',border:'1px solid'}}name='topicsCovered' value={this.state.taskPerformed[index].topicsCovered[index1]} placeholder={index1}  onChange={(e)=>this.handleTask(e,index,index1)}  /> 
                                                                        )
                                                                    })
                                                                }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='column' style={{width:'20%'}}>
                                                <div className='column'style={{display:'block',marginLeft:'60%',marginRight:'auto'}}>
                                                    <span className="btn btn-info btn-sm" style={{margin:'3px'}} onClick={(e,index)=>this.addmoreRow(e,index)} >
                                                        <span className="glyphicon glyphicon-plus"></span>+
                                                    </span>
                                                    { index ?
                                                        <span  className='btn btn-info btn-sm'  onClick={(e)=>this.removeRow(e,index)} style={{margin:'3px',paddingLeft:'12px',paddingRight:'12px'}} >
                                                        <span className="glyphicon glyphicon-plus"></span> -
                                                    </span>:''}
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                </Fragment>
                            )
                       }) 
                    }
                    <div className="row" style={{width:'100%'}}>
                        <div className="column" style={{alignItems:'center',textAlign:'center'}}>
                            <input className="btn btn-info" type="submit" value="Submit" style={{borderRadius:'5px',marginLeft:'80%'}}onClick={this.handleSubmit}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Finalform;