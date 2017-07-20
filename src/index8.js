import * as React from 'react';
import { style } from 'typestyle';

const className = style(
	{
		color: '#666',
		fontSize: '30px',
		transition: 'font-size .2s',
		$nest: {
			'&::after': {
				content: `attr(data-after)`
			},
			'&::selection': {
				color: 'gold',
				background: 'black'
			},
			'&:focus': {
				fontSize: '30px'
			},
			'&&:hover': {
				fontSize: '50px'
			},
		}
	},
);

const App = () => {
	return (
		<div className={className} data-after=" Pseudo Again">
			Hello, world!
		</div>
	)
}

export default App;