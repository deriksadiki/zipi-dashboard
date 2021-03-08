import React from 'react';
import '../App.css'
import firebase from '../firebaseConfig';


export default class Attempts extends React.Component{
    constructor(){
        super()
        this.state = {
            list : [],
            show: false
        }
    }

   componentDidMount(){
       firebase.database().ref('ZipiliteReq/').on('value', data =>{
           if (data.val() != null){
               let details = data.val();
               let keys = Object.keys(details);
               let tempArray = new Array();
               for (let x = 0; x < keys.length; x++){
                   let innerKeys = Object.keys(details[keys[x]]);
                   let innerDetails = details[keys[x]]
                   let obj = {
                       name : innerDetails[innerKeys[0]].name,
                       email : innerDetails[innerKeys[0]].email,
                       location: innerDetails[innerKeys[0]].PickUp,
                       cell : innerDetails[innerKeys[0]].cell,
                       attempts : innerKeys.length,
                       date : innerDetails[innerKeys[0]].date
                   }

                   tempArray.push(obj)
               }
               this.setState({
                   list: tempArray
               })
           }
       })
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


    render(){

        const req = this.state.list.map((data, index) =>
        <div key={index}>
            <div >
                    <p style={{fontSize:22}}>Name : {data.name}</p>
                    <p style={{fontSize:22}}>Cell : {data.cell}</p>
                    <p style={{fontSize:22}}>Email : {data.email}</p>
                    <p style={{fontSize:22}}>Location : {data.location.replace(', South Africa', '')}</p>
                    <p style={{fontSize:22}}>Date : {data.date}</p>
                    <p style={{fontSize:22}}>Attempts : {data.attempts} times</p>
                    <hr></hr>
            </div>
        </div>
        )

        return(
          <div className={this.state.show ? "App-modal" : "App-hide"}>
            <div className="App-modal-content2"> 
            <span className="App-close" onClick={this.hideEdit}>&times;</span><br></br>
            <div style={{textAlign:'center'}}>
                <br></br>
                {req}
            </div>
          </div>
        </div> 
        )
    }
}
