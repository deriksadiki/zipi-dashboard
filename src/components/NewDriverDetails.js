import React from 'react';
import '../App.css'
import firebase from '../firebaseConfig';

let id = '';
let report = '';
let insuarance = '';
let proPic = '';
let certificate = '';
let banking = '';
let natisDoc = '';
let license = '';
let accNo = '';
let branchCode = '';
let docCounter =  false;

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
            key: '',
            img: '',
            showEdit: false
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
      img: data.img,
      Showbuttons: false,
      id: '',
      report:'',
      insuarance: '',
      proPic: '',
      certificate: '',
      banking: '',
      natisDoc: '',
      license:'',
      accNo:'',
      branchCode: ''

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
      img: data.img,
    })
  }
  hideHelp = () =>{
    this.setState({help:false, moreInfo:false})
  }

  hideEdit = () =>{
    this.setState({
      showEdit: false
    })
  }
  editDriver = () =>{
    this.setState({
      showEdit: true,
      help:false
    })
  }

  acceptDriver = () =>{
    firebase.database().ref('drivers/' + this.state.key).update({status: "accepted", totalTrips: "0",availability: true, 
    img: "https://library.kissclipart.com/20181005/bee/kissclipart-white-person-icon-png-clipart-computer-icons-deskt-73f851694f2ebca8.jpg", totAmount: 0 })
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

  selectID(event, tableId){
    if (event.target.files && event.target.files[0]) {
      let name = event.target.files[0].name;
      let reader = new FileReader();
        reader.onload = (event) => {
          let x = event.target.result
          let imageRef =  firebase.storage().ref(name)
          let task = imageRef.putString(x,'data_url')
          task.on('state_changed',
          function progress(snapshot){
              var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
              console.log(percentage)
          },
          function error(err){
            console.log(err)
          },
          function complete(){
            var Url_File = task.snapshot.ref.getDownloadURL().then(function (URL) {
                if (tableId === "ID")
                    id = URL
                else if (tableId === "Inspection")
                    report = URL
                else if (tableId === "Lice")
                    license = URL
                else if (tableId === "Car")
                    insuarance = URL
                else if (tableId === "Pic")
                    proPic = URL
                else if (tableId === "Roadworthy")
                    certificate = URL
                else if (tableId === "Bank")
                    banking = URL
                else if (tableId === "Nat")
                    natisDoc = URL
              document.getElementById(tableId).style.backgroundColor =  '#ffe200';
              let docCounter = true
          });
          
          }
         );
        }
        reader.readAsDataURL(event.target.files[0]);
      }
  }


  saveData = () =>{
    if (docCounter){
    firebase.database().ref('drivers/' + this.state.key).update({ 
      img : proPic,
      account_number: this.state.accNo,
      branch_code: this.state.branchCode,
      ID : id,
      natisDoc: natisDoc,
      bankingDetails: banking,
      roadWorthyCertificate: certificate,
      inspectionReport: report,
      insuarance: insuarance,
      license: license
    }).then(()=>{
      this.hideEdit()
    })
  }else{
    firebase.database().ref('drivers/' + this.state.key).update({ 
      account_number: this.state.accNo,
      branch_code: this.state.branchCode,
    }).then(()=>{
      this.hideEdit()
    })
  }
  }

    render(){
        return(
        <div>
          <div className={this.state.showEdit ? "App-modal" : "App-hide"}>
            <div className="App-modal-content2"> 
            <span className="App-close" onClick={this.hideEdit}>&times;</span><br></br>
                <table>
                  <tr>  
                    <td id="ID">
                      <label for="IDno">ID Document</label>
                    <input type="file" id="IDno" onChange={(e)=>{this.selectID(e, "ID")}}/>
                    </td>
                    <td id="Inspection">
                    <label for="report">Inspection Report</label>
                    <input type="file" id="report" onChange={(e)=>{this.selectID(e,"Inspection")}}/>
                    </td>
                    <td id="Lice">
                    <label for="license">Driver's License</label>
                    <input type="file" id="license" onChange={(e)=>{this.selectID(e, "Lice")}}/>
                    </td>
                    <td id="Car">
                    <label for="Insurance">Car Insurance</label>
                    <input type="file" id="Insurance" onChange={(e)=>{this.selectID(e, "Car")}}/>
                    </td>
                  </tr>

                  <tr >
                    <td id="Pic">
                      <label for="Picture">Picture</label>
                    <input type="file" id="Picture" onChange={(e)=>{this.selectID(e, "Pic")}}/>
                    </td>
                    <td id="Roadworthy">
                    <label for="Certificate">Roadworthy Certificate </label>
                    <input type="file" id="Certificate" onChange={(e)=>{this.selectID(e, "Roadworthy")}}/>
                    </td>
                    <td id="Bank">
                    <label for="Banking">Banking Details</label>
                    <input type="file" id="Banking" onChange={(e)=>{this.selectID(e, "Bank")}}/>
                    </td>
                    <td id="Nat">
                    <label for="Natis">Natis Document</label>
                    <input type="file" id="Natis" onChange={(e)=>{this.selectID(e, "Nat")}}/>
                    </td>
                  </tr>
                </table>
                <div className="inputs">
                  <input placeholder="Account Number" value={this.state.accNo} onChange={(e)=>{this.setState({accNo:e.target.value})}} /><br></br>
                  <input placeholder="Branch Code" value={this.state.branchCode}  onChange={(e)=>{this.setState({branchCode:e.target.value})}}/><br></br>
                  <button className="saveBtn" onClick={this.saveData}>Save</button>
                </div>
            </div>
          </div>  
          <div className={this.state.help ? "App-modal" : "App-hide"}>
            <div className="App-modal-content">
                <span className="App-close" onClick={this.hideHelp}>&times;</span><br></br>
                <img className="images2" src={this.state.img} />
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
              <div>
              {(this.state.Showbuttons ? <div> <button className="App-button" onClick={this.acceptDriver}>Accept</button><button className="App-button2">Reject</button> </div>
              : <div className="Editbtn"> <button className="App-button" onClick={this.editDriver}>Edit</button> </div>
              )}
              </div>
            </div>
          </div>
        </div> 
        )
    }
}
