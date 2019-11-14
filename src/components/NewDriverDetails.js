import React from 'react';
import '../App.css'

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
            Showbuttons:false
        }
    }
    
  openMoreInfo = (object, num, data) =>{
    this.setState({help:true, selectedImage: object, activeDriver: data, activeIndex:num,
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
      Showbuttons: false
    })
  }

  openHelp = (object, num, data) =>{
    this.setState({help:true, selectedImage: object, activeDriver: data, activeIndex:num,
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
      Showbuttons: true
    })
  }
  hideHelp = () =>{
    this.setState({help:false, moreInfo:false})
  }
    render(){
        return(
        <div>
          <div className={this.state.help ? "App-modal" : "App-hide"}>
            <div className="App-modal-content">
                <span className="App-close" onClick={this.hideHelp}>&times;</span><br></br>
                  <img className="images" src={this.state.selectedImage} />
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