import React from 'react';
import '../App.css'
import firebase from '../firebaseConfig';


export default class Discount extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            amount : '',
            show: false
        }
    }
    
  openMoreInfo = () =>{
    this.setState({
        show: true,
    })
  }

  hideEdit = () =>{
    this.setState({
      show: false,
    })
  }

  saveDiscount = () =>{
      
      firebase.database().ref('discount/').set({
          discount : this.state.amount
      }).then(()=>{
        alert('save')
      })
  }

    render(){
        return(
          <div className={this.state.show ? "App-modal" : "App-hide"}>
            <div className="App-modal-content2"> 
            <span className="App-close" onClick={this.hideEdit}>&times;</span><br></br>
            <div style={{textAlign:'center'}}>
                <br></br>
                <input  className="inputStyle" value={this.state.amount} onChange={(text)=>{this.setState({amount: text.target.value})}} type="text" placeholder="Discount" /><br></br><br></br>
                <button className="App-button" onClick={this.saveDiscount} >Save</button>
            </div>
          </div>
        </div> 
        )
    }
}
