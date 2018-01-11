import React from 'react';

export default class AppHeader extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {};
  	}
  	componentDidUpdate(nextProps, nextState) {
	    //let newShoppingItems = this.calculateShoppingItems();
	    //this.setState({ listOfShoppingItems: newShoppingItems });
  	}
  	shouldComponentUpdate(nextProps, nextState) {
        //this.setState({ src: this.props.initialImage });
        //return true;
    }
	render() {
		return (
			<header className='app-header'>app-header</header>
		);
	}
}