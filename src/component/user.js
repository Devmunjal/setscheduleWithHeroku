import React, { Component } from 'react';
import './scss/user.scss';
import { gql } from 'apollo-boost'; 
class User extends Component {
constructor(props){
  super(props);
  this.state={
      data:null
  }
}
componentDidMount(){
    const query =`query{
        traning{
          title
          date
          startTime
          endTime
          taskPerformed{
            heading
            startTiming
            topicsCovered
          }
        }
      }`
    fetch('https://setschedule.herokuapp.com/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query})
      })
        .then(r => r.json())
        .then(data =>this.setState({ data }));
}
    render() {
       console.log(this.state);
        return (
            <div>
                {    
                    this.state.data=== null ?'':this.state.data.data.traning.map((d,i)=>{
                        var color;
                        var text;
                        {(i%2 == 0) ? (color ='#303c6c')  :(color='#d2fdff')}
                        {(i%2 == 0) ? (text='#d2fdff')  :(text='#303c6c')}
                        const date1 = new Date(d.date);
                    return(
                        <div class="col-lg-5 display" onClick={()=>this.props.handleModal(d)} >
                        <div className="card"  style={{backgroundColor:color}}>
                          <div  key={i} className="card-body">
                            <div className="card-title">
                                <h5 style={{color:text}}>{d.title}</h5>
                            </div>
                           
                            <hr style={{borderColor:text}}></hr>
                              
                            <table className="card-text"style={{fontSize:'15px'}}>
                                  <tr style={{width:'100%'}}>
                                      <td style={{fontWeight:'bold',paddingRight:'10%',color:text,fontSize:'22px'}}>Date :</td>
                                      <td style={{color:text,fontSize:'22px',paddingLeft:'21px'}}>
                                          {date1.getDate()+' / '+(date1.getMonth()+1)+' / '+date1.getFullYear()}
                                      </td>
                                  </tr>
                                  <tr style={{width:'100%',color:text}}> 
                                      
                                        
                                            <td style={{fontWeight:'bold'}}>
                                                Start Time :
                                            </td>
                                            <td style={{paddingLeft:'10%'}}>
                                                {d.startTime}
                                            </td>
                                      
                                        
                                  </tr>
                                  <tr style={{color:text}}>
                                            <td style={{fontWeight:'bold'}}>
                                                End Time :
                                            </td>
                                            <td style={{paddingLeft:'10%'}}>
                                                {d.endTime}
                                            </td>
                                    </tr>
                              </table>
                              <table >
                                  <tr style={{color:text}}>
                                      <td style={{fontSize:'15px',width:'10%',marginTop:'0'}}>
                                         <p style={{position:'relative',top:'0',fontWeight:'bold'}}> Details : </p>
                                      </td>
                                      <td style={{fontSize :'12px',width:'50%'}}>
                                        <ul style={{paddingLeft:'50px'}}>
                                            {
                                                d.taskPerformed.map(head => {
                                                return(head.heading==='Lunch'?'':<li style={{listStyleType:'none'}}>{head.heading}</li>)
                                                })
                                            }
                                        </ul>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                        </div>
                        
                      </div>
                      
                      )
                    })
                } 
            </div>       
            )
    }
}

export default User;