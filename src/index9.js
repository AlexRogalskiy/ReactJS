import * as React from 'react';
import { style, media } from 'typestyle';

const className = style(
	{
		color: 'red',
		transition: 'font-size .2s',
		$nest: {
			'@media screen and (-webkit-min-device-pixel-ratio: 2)': { backgroundColor: 'blue' }
		}
	},
	media({ minWidth: 500, maxWidth: 700 }, { fontSize: '30px' }),
	media({ minWidth: 701 }, { fontSize: '50px' }),
);

const App = () => {
	return (
		<div className={className}>
			Hello, world!
		</div>
	)
}

export default App;