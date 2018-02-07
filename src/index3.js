import * as React from 'react';
import { style, types } from 'typestyle';


const scroll: types.NestedCSSProperties = {
	'-webkit-overflow-scrolling': 'touch',
	overflow: 'auto'
}

const className = style(
	scroll,
	{
		fontSize: '40px',
		backgroundColor: [
			'rgb(200, 54, 54)', //Fallback
			'rgba(200, 54, 54, 0.5)', //Upgrade
		]
	}
);

const App = () => {
	return (
		<div className={className}>
			Hello, world!
		</div>
	)
}

export default App;