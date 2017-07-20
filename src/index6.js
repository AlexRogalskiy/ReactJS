import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style, cssRaw } from 'typestyle';

cssRaw(
	`
		.red {
			color: red;
		}
	`
);

const className = style(
	{
		fontSize: '30px',
	}
);

cssRaw(
	`
		.bold {
			font-weight: bold;
		}
	`
);

cssRaw(
	`
		.back {
			background-color: blue;
		}
	`
);

const App = () => {
	return (
		<div className={className + ' red bold back'}>
			Hello, world!
		</div>
	)
}

export default App;