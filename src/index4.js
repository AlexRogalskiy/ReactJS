import * as React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';
//import * as express from 'express';
import * as typestyle from 'typestyle';

/*const renderPage = ({ html, css }) => {
	return (
		<html>
			<head>
				<style id="styles-target">${css}</style>
			</head>
			<body>
				<div id="root">${html}</div>
				<script src="./bundle.js"></script>
			</body>
		</html>
	)
}*/

const className = typestyle.style({
	color: 'red',
	fontSize: '20px',
});
const htmlName = ({ css }) => {
	return (
		<div className={css}>
			Hello, world!
		</div>
	)
}
typestyle.setStylesTarget(document.getElementById('styles-target'));
const css = typestyle.getStyles();
const html = ReactDOMServer.renderToStaticMarkup(<htmlName data={ className } />);

export const App = () => {
	return (
		htmlName({ css: className })
		//renderPage({ html, css })
	)
}

export default App;
//const renderedPage = renderPage({ html, css });

//const app = express();
//app.get('/', (req, res) => {
//	res.send(renderedPage);
//});
//app.use(express.static('public'));
//app.listen(3000, () => {
//	console.log('Listening on port 3000');
//});