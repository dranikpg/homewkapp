import React from 'react'
import { BarChart, CartesianGrid,
    XAxis,YAxis,Legend,Bar } from 'recharts'


class StatTestCP extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.data);
        return (
        <BarChart width={600} height={300} data={this.props.data}
                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#8884d8" />
        </BarChart>
        )
    }

}

export default StatTestCP;

/*

const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
const StackedBarChart = React.createClass({
	render () {
  	return (

    );
  }
})
 */