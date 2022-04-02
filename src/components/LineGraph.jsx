import React,{ useEffect,useState } from 'react'
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"
import axios from 'axios'

export default function LineGraph({height,width}) {

    const xLabels = [1,2,3,4,5,6,7,8,9,10]

    const [state,setState] = useState({x:xLabels,y:[]})

    useEffect(()=>{
      let temp = axios.get("https://vitt-ai-back-end.herokuapp.com/data")
      temp.then(data=> {
        setState((prev)=> {return {x:prev.x,y:data.data.y}})
    
        }).catch(err=>console.log(err))
      
    },[])


    let data = {
        datasets: [{
            label: 'growth',
            data: state.y,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
                                ],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
            pointStyle:'circle',
            pointRadius:3,
            pointHoverRadius:6
          }]
    }
    
    return (
      <div style={{height:`${height}`,width:`${width}`}}>


        {state.y.length>0 && <Line 
        
        data={{
            labels:state.x,
            datasets:data.datasets
        }}
        options= {{
          responsive: true,
          plugins: {
            legend: {
            position: 'top',
            },
            title: {
              display: true,
              text: 'Line graph'
            }
          }
        }}

        />}
      </div>
          
      
        
    
  )
}
