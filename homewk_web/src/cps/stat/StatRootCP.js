import React from 'react'
import LA from '../../actions/la'
import StatStore from '../../stores/StatStore'
import StatTestCP from "./StatTestCP";
import UserStatCP from "./UserStatCP";

class StatRootCP extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loaded:StatStore.loaded()
        }
    }

    _update(){
        console.log("loaded");
        this.setState({
            loaded:StatStore.loaded()
        })
    }

    componentWillMount(){
        if(StatStore.loaded())return;
        console.log("stat loaded");
        LA.loadstat();
        StatStore.change(this._update.bind(this));
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.state.loaded) return ("Loading")
        else {
            let data = StatStore.get();
            return(
                <UserStatCP data={data.usercd}/>
            )
        }
    }
}

export default StatRootCP;