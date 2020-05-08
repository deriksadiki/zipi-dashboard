import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import Drivers from '../../components/Drivers'

export default class Transport extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            data:[],
            driversArr: [],
            months : ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        }
    }

    componentDidMount(){
        this.getDrivers()
    }

    getDrivers(){
        if (this.Drivers.state.loading == false){
          this.setState({
          driversArr : this.Drivers.state.accepted,
        })
        this.countDrivers(this.Drivers.state.accepted)
        setTimeout(() => {
          this.getDrivers();
        }, 60000);
        }else{
          setTimeout(() => {
            this.getDrivers();
          }, 1000);
        }
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
                    <div style={{display:'none'}}>
                        <Drivers ref={ref=>{this.Drivers = ref}} />
                    </div>
                    <Bar data={this.state.data} legend={false} />
                </div>
        )
    }
}