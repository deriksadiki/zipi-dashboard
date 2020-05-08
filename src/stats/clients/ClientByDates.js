import React,{Component} from 'react'
import {Bar} from 'react-chartjs-2';
import Users from '../../components/Users'

export default class ClientByDates extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            data:[],
            driversArr: [],
            total : "0",
        }
    }

    componentDidMount(){
        this.getDrivers()
    }

    getDrivers(){
        if (this.Users.state.loading == false){
          this.setState({
          driversArr : this.Users.state.usersArr,
        })
        if (this.Users.state.usersArr.length > 0){
        let tempArr =  new Array();
        tempArr.push(this.Users.state.usersArr[0].date.split(' ')[0])
        for (var x = 0; x < this.Users.state.usersArr.length; x++){
          let counter = true
            for (var i = 0; i < tempArr.length; i++){
              if (this.Users.state.usersArr[x].date.split(' ')[0] === tempArr[i]){
                 counter = false
              }
             
            }
            if (counter)
                tempArr.push(this.Users.state.usersArr[x].date.split(' ')[0])
        }
        this.countDrivers(tempArr)
      }
        setTimeout(() => {
          this.getDrivers();
        }, 60000);
        }else{
          setTimeout(() => {
            this.getDrivers();
          }, 1000);
        }
      }

      countDrivers(Users){
        var tempArr =  new Array()
        var labels =  new Array()
          for (var i = 0; i < Users.length; i++){
              var total = 0;
              labels.push(Users[i])
              for (var x = 0; x < this.Users.state.usersArr.length; x++){
                  if (Users[i] === this.Users.state.usersArr[x].date.split(' ')[0]){
                    total++;
                  }
              }
              tempArr.push(total)
          }
          this.setState({
            data:{
                labels: labels,
                datasets: [{
                  backgroundColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderColor: [
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)'
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
                        <Users ref={ref=>{this.Users = ref}} />
                    </div>
                    <Bar data={this.state.data} legend={false} />
                </div>
        )
    }
}