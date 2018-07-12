import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import TaskStore from '../stores/TaskStore'


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           items: []
        };
    }
    _onChange() {
        this.setState({ items: TaskStore.getAllItems() });
        console.log(this.state);
    }

    componentWillMount() {
        TaskStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        TaskStore.removeChangeListener(this._onChange);
    }
    render() {
        console.log("RENDER");
        return (
            <List component="nav">
                {this.state.items.map((dt) => {
                    return (<ListItem> <ListItemText primary={dt}/> </ListItem>);
                })}
            </List>
        );
    }
}

export default TaskList;
