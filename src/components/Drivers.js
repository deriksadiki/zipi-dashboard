import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import firebase from '../firebaseConfig'

export default class Drivers extends React.Component{
    constructor(props){
        super();
        this.state ={
            driverKeys: [],
              driversArr: [],
              pending: [],
              accepted: [],
              data : [],
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
            var tempPending =  new Array()
            for (var x = 0; x < keys.length; x++){
              if (details[keys[x]].status == "pending")
                tempPending.push(details[keys[x]])
              else
                tempAccepted.push(details[keys[x]])
              tempArr.push(details[keys[x]].month)
            }
            this.countDrivers(tempArr)
            this.setState({
              driverKeys: keys,
              driversArr: details,
              loading: false,
              pending: tempPending,
              accepted: tempAccepted
            })
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
                    backgroundColor: 'rgb(191, 86, 151)',
                    borderColor: 'rgb(255, 99, 132)',
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
            <Bar data={this.state.data} legend={false} />
        )
    }
}