import * as React from 'react';
import { style } from 'typestyle';

const fontSize = (value: number | string) =>
{
	const valueStr = typeof value === 'string'
	? value
	: value + 'px';
	return {
		fontSize: valueStr
	}
};
const className = style(
	fontSize('3em'),
	{
		color: 'red',
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