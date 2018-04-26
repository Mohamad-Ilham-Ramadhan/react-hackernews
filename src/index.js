import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/index.js';
import ExplainBindingsComponent from './explainBindingsComponent.js';

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

// ReactDOM.render(
// 	<ExplainBindingsComponent />,
// 	document.getElementById('explain-bind')
// );

module.hot.accept();