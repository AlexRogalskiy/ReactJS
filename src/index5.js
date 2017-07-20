import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { style, keyframes} from 'typestyle';

const colorAnimationName = keyframes({
	'0%': {color: 'black'},
	'50%': {color: 'blue'}
});
const colorAnimationName2 = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 }
});

const className = style(
	{
		fontSize: '20px',
		animationName: colorAnimationName2,
		animationDuration: '1s',
		animationIterationCount: 'infinite'
	},
);

const App = () => {
	return (
		<div className={className}>
			Hello, world!
		</div>
	)
}

export default App;