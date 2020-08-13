import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import firebase from '../firebaseConfig'
import '../App.css';

export default class Drivers extends React.Component{
    constructor(props){
        super();
        this.state ={
            driverKeys: [],
              driversArr: [],
              pending: [],
              accepted: [],
              data : [],
              bikes:[],
              bakkies:[],
              trucks:[],
              showStats: false,
              loading:true,
              months : ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"]
        }
    }
    componentDidMount(){
        this.getDrivers();
    }

    getDrivers(){
        firebase.database().ref('drivers/').on('value', drivers =>{
          if (drivers.val() !== null || drivers.val() !== undefined){
            var details = drivers.val();
            var keys =  Object.keys(details);
            var tempArr =  new Array()
            var tempAccepted =  new Array();
            var tempPending =  new Array();
            var tempBikes =  new Array()
            var tempBakkies =  new Array()
            var tempTrucks =  new Array()
            for (var x = 0; x < keys.length; x++){
              if (details[keys[x]].status == "pending"){
                let tempObj = details[keys[x]];
                tempObj.key = keys[x];
                tempPending.push(tempObj)
                tempArr.push(details[keys[x]].month)
              }
              else{
                if (details[keys[x]].mode == "Bike"){
                  let tempObj = details[keys[x]];
                  tempObj.key = keys[x];
                   tempBikes.push(tempObj)
                }
                else if (details[keys[x]].mode == "1 Ton Bakkie"){
                  let tempObj = details[keys[x]];
                  tempObj.key = keys[x];
                    tempBakkies.push(tempObj)
                }
                else{
                  let tempObj = details[keys[x]];
                  tempObj.key = keys[x];
                  tempTrucks.push(tempObj)
                }
                tempArr.push(details[keys[x]].month)
                let tempObj = details[keys[x]];
                tempObj.key = keys[x];
                tempAccepted.push(tempObj)
              }
            }
            this.countDrivers(tempArr)
            this.setState({
              driverKeys: keys,
              driversArr: details,
              loading: false,
              pending: tempPending,
              accepted: tempAccepted,
              bakkies: tempBakkies,
              bikes: tempBikes,
              trucks: tempTrucks            })
          }
        })
      }


      countDrivers(drivers){
        var tempArr =  new Array()
          for (var i = 0; i < this.state.months.length; i++){
              var total = 0;
              for (var x = 0; x < drivers.length; x++){
                  if (this.state.months[i] == drivers[x]){
                    total++;
                  }
              }
              tempArr.push(total)
          }
          this.setState({
            data:{
                labels: this.state.months,
                datasets: [{
                  backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                    data: tempArr,
                }],
                options: { 
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            }
          })
      }

    render(){
        return(
            <div>
              <Bar data={this.state.data} legend={false} />
              </div>

        )
    }
}