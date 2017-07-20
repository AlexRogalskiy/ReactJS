import * as React from 'react';
//import ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
//import * as fs from 'fs';

import { style, getStyles } from 'typestyle';

const className = style({
	color: 'red',
	fontSize: '30px',
})
const App = () => {
	return (
		<div className={className}>
			Hello, world!
		</div>
	)
}

const html = ReactDOMServer.renderToStaticMarkup(<App />);
const css = getStyles();
console.log({ html, css });

const renderPage = ({ html, css }) => `
	<html>
		<head>
			<style>${css}</style>
		</head>
		<body>
			<div>${html}</div>
		</body>
	</html>
`
//const renderedPage = renderPage({ html, css });
//fs.writeFileSync(__dirname + '/index.html', renderedPage);

export default App;