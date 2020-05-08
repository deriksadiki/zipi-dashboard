import React from 'react';
import '../App.css'
import firebase from '../firebaseConfig';

export default class DriverDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            phone:'',
            idNo: '',
            midName: '',
            surname: '',
            firstName:'',
            month : '',
            licenseNo: '',
            startDate : '',
            endDate : '',
            code : '',
            make :  '',
            model : '',
            year: '',
            plateNum : '',
            street :  '',
            suburb : '',
            city: '',
            country : '',
            postalCode: '',
            moreInfo: false,
            Showbuttons:false,
            key: ''
        }
    }
    
  openMoreInfo = ( num, data) =>{
    this.setState({help:true, activeDriver: data, activeIndex:num,
      email: data.email,
      phone: data.phone,
      idNo: data.idNo,
      midName: data.midName,
      surname: data.surname,
      firstName: data.firstName,
      month : data.month,
      licenseNo:data.licenseNo,
      startDate : data.startDate,
      endDate : data.endDate,
      code : data.code,
      make :  data.make,
      model : data.model,
      mode: data.mode,
      year: data.year,
      plateNum : data.plateNum,
      street :  data.street,
      suburb : data.suburb,
      city: data.city,
      country :data.country,
      postalCode: data.postalCode,
      key : data.key,
      Showbuttons: false
    })
  }

  openHelp = (num, data) =>{
    
    this.setState({help:true, activeDriver: data, activeIndex:num,
      email: data.email,
      phone: data.phone,
      idNo: data.idNo,
      midName: data.midName,
      surname: data.surname,
      firstName: data.firstName,
      month : data.month,
      licenseNo:data.licenseNo,
      startDate : data.startDate,
      endDate : data.endDate,
      code : data.code,
      make :  data.make,
      model : data.model,
      mode: data.mode,
      year: data.year,
      plateNum : data.plateNum,
      street :  data.street,
      suburb : data.suburb,
      city: data.city,
      country :data.country,
      postalCode: data.postalCode,
      Showbuttons: true,
      key : data.key,
    })
  }
  hideHelp = () =>{
    this.setState({help:false, moreInfo:false})
  }
  acceptDriver = () =>{
    firebase.database().ref('drivers/' + this.state.key).update({status: "accepted"})
    this.setState({help:false, moreInfo:false})
    let xhr = new XMLHttpRequest();
    let values = `email=${this.state.email}`;
    let url = 'https://cors-anywhere.herokuapp.com/https://zipi.co.za/approved.php?';
    xhr.open('GET', `${url}&${values}`, false)
    xhr.onreadystatechange = () =>{
        if (xhr.status == '200' &&  xhr.readyState == '4'){
            let resp =  xhr.responseText;
        }
    }
    xhr.send()
  }
    render(){
        return(
        <div>
          <div className={this.state.help ? "App-modal" : "App-hide"}>
            <div className="App-modal-content">
                <span className="App-close" onClick={this.hideHelp}>&times;</span><br></br>
                  <img className="images2" src="data:image/png;base64,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"/>
                  <div className="App-Details2">
                    <span style={{fontSize:23, fontWeight:'bold'}}>Personal Details</span><br></br>
                    <span><a ></a> <a className="contentIcons">Name: {this.state.firstName} {this.state.surname}</a></span>
                    <br></br>
                    <span ><a ></a><a className="contentIcons">ID/Passport: {this.state.idNo}</a>  </span>
                    <br></br>
                    <span><a ></a><a className="contentIcons">Cell:{this.state.phone}</a> </span>
                    <br></br>
                    <span ><a ></a><a className="contentIcons">Email: {this.state.email}</a></span>
                    <br></br>
                    <br></br>
                    <span style={{fontSize:23, fontWeight:'bold'}}>Vehicle Details</span><br></br>
                    <span><a ></a><a className="contentIcons">Make: {this.state.make} {this.state.model}</a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Mode: {this.state.mode}</a></span>
                    <br></br>
                    <span><a ></a><a className="contentIcons">Plate Number: {this.state.plateNum}</a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Year: {this.state.year}</a></span>
                    <br></br>
                    <br></br>
                    <span style={{fontSize:23, fontWeight:'bold'}}>License Details</span><br></br>
                    <span><a ></a><a className="contentIcons">license No: {this.state.licenseNo} </a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Start Date: {this.state.startDate}</a></span>
                    <br></br>
                    <span><a ></a><a className="contentIcons">End Date: {this.state.endDate}</a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Code: {this.state.code}</a></span>
                    <br></br>
                    <br></br>
                    <span style={{fontSize:23, fontWeight:'bold'}}>Address Details</span><br></br>
                    <span><a ></a><a className="contentIcons">Street: {this.state.street} </a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Suburb: {this.state.suburb}</a></span>
                    <br></br>
                    <span><a ></a><a className="contentIcons">City: {this.state.city}</a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Country: {this.state.country}</a></span>
                    <br></br>
                    <span><a></a><a className="contentIcons">Postal Code: {this.state.postalCode}</a></span>
                    <br></br>
                    <br></br>
                </div>
              <div className={this.state.Showbuttons ? "App-buttons" : "App-hide"}>
                <button className="App-button" onClick={this.acceptDriver}>Accept</button><button className="App-button2">Reject</button>
              </div>
            </div>
          </div>
        </div> 
        )
    }
}