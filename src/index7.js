import * as React from 'react';
import { style, classes } from 'typestyle';

const baseClassName = style(
	{
		color: '#666',
	}
);

const errorClassName = style(
	{
		backgroundColor: 'red',
	}
);

const Appp = ({ className, hasError } : { className?: string, hasError?: boolean }) => {
	return (
		<div className={
			//baseClassName + (className? ' ' + className : '') + (hasError? ' ' + errorClassName : '')
			classes(
				baseClassName,
				className,
				hasError && errorClassName
			)
		}>
			Hello, world!
		</div>
	)
}

const App = () => {
	return (
		Appp({})
		//Appp({ className: style({ fontSize: '30px' })})
	)
}

export default App;