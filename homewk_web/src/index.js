import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {RUN} from './util/startup'

document.title="Fizmat HW"

ReactDOM.render(<App />, document.getElementById('root'));

RUN();
