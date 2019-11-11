
import React, {Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import firebase from '../firebaseConfig'

export default class Users extends React.Component{
    constructor(props){
        super()
        this.state ={
            data: [],
            usersKeys: [],
            usersArr: [],
            months : [],
            monthsData: [],
           loading: true
        }
    }
    componentDidMount(){
        this.getAppUsers();
    }
    getNumber = () =>{
        return this.state.usersKeys.length
    }

    getAppUsers(){
        firebase.database().ref('users/').on('value', users =>{
          if (users.val() !== null || users.val() !== undefined){
          var details =  users.val();
          var keys = Object.keys(details);
          var tempArray = new Array();
          var counter =  new Array();
          counter.push(details[keys[0]].month)
          for (var x = 0; x < keys.length; x++){
              var track = false;
              for (var i = 0; i < counter.length; i++){
                  if (counter[i] == details[keys[x]].month){
                    track = true
                  }
              }
              if (track === false){
                  counter.push(details[keys[x]].month)
              }
            tempArray.push(details[keys[x]].month)
          }
          var months = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
          this.sortMonths(tempArray, months);
          this.setState({
            usersKeys: keys,
            usersArr: details,
            loading: false
            })
          }
        })
      }
      sortMonths(months, counter){
        let tempArray = new Array();
        for (var i = 0; i < counter.length; i++){
            var total = 0
            for (var x = 0; x < months.length; x++){
                if (counter[i] == months[x]){
                    total++
                }
            }
            tempArray.push(total)
        }
        this.setState({
            data:{
                labels: counter,
                type: 'line',
                datasets: [{
                    label: '',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: tempArray
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
            <div className="Charts">
               <Line data={this.state.data} />
            </div>
        )
    }
}