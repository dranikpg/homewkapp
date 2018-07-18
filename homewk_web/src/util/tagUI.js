import React, { Component } from 'react';

import InfoI from '@material-ui/icons/Info';
import HomeWKI from '@material-ui/icons/LibraryBooks';
import NoneI from '@material-ui/icons/Error';

export function geticon(id){
    if(id == -1)return (<NoneI />);
    else if(id == 0)return (<HomeWKI />)
    else return (<InfoI />)
}
