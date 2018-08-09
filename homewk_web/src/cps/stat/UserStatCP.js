import React from 'react'
import {
    BarChart, CartesianGrid, Tooltip,
    XAxis, YAxis, Legend, Bar, ResponsiveContainer
} from 'recharts'

import '../../css/vertchart.css'

class StatTestCP extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.data);
        return (
            <ResponsiveContainer >
                <BarChart data={this.props.data}
                          layout="vertical"
                          margin={{top: 5, right: 20, left: 40, bottom: 5}}
                >
                    <Tooltip />
                    <XAxis type="number" />
                    <YAxis tick={{fontSize: "0.9em"}} dataKey="name" type="category"/>
                    <Bar dataKey="val" stackId="a" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        )
    }

}

export default StatTestCP;
