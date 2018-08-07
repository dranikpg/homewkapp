import React, { Component } from 'react';

import '../tags.css'

import InfoI from '@material-ui/icons/Info';
import HomeWKI from '@material-ui/icons/LibraryBooks';
import NoneI from '@material-ui/icons/Error';

export function geticon(id){
    if(id === -1)return (<NoneI />);
    else if(id === 0)return (<HomeWKI />);
    else if(id === 1)return (<HomeWKI className="hardhw"/>);
    else if(id === 2)return (<HomeWKI className="easyhw" />);
    else return (<InfoI />)
}
