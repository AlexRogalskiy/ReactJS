"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicText  from 'appRoot/js/components/elements/basicText';
import BasicIcon  from 'appRoot/js/components/elements/basicIcon';

import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default const BasicCounter extends React.Component {
	displayName: 'BasicCounter'
	static propTypes: {
		dataClass: Types.object,
		counter: Types.number,
		min: Types.number,
		max: Types.number,
		step: Types.number,
		isVisible: Types.bool,
		up: Types.func,
        down: Types.func,
        buttonLabelUp: Types.string,
        buttonLabelDown: Types.string,
		buttonPrefix: Types.string,
		item: Types.object,
		key: Types.string
    }
    defaultProps = {
    	dataClass: { buttonClass: 'btn', textClass: 'text', iconLabelUpClass: 'glyphicon glyphicon-circle-arrow-up', iconLabelDownClass: 'glyphicon glyphicon-circle-arrow-down', iconUpClass: 'glyphicon glyphicon-thumbs-up', iconDownClass: 'glyphicon glyphicon-thumbs-down' },
        counter: 0,
        min: Number.MIN_VALUE,
        max: Number.MAX_VALUE,
        step: 1,
        isIncreasing: false,
		isVisible: false,
		up: null,
        down: null,
		buttonLabelUp: 'Up',
        buttonLabelDown: 'Down',
		buttonPrefix: 'btn',
		item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
        	dataClass: this.props.dataClass,
            counter: this.props.counter,
            min: this.props.min,
            max: this.props.max,
            step: this.props.step,
            isIncreasing: false,
            isVisible: this.props.isVisible,
            up: this.props.up,
            down: this.props.down,
            buttonLabelUp: this.props.buttonLabelUp,
            buttonLabelDown: this.props.buttonLabelDown,
            buttonPrefix: this.props.buttonPrefix,
			item: this.props.item,
			key: this.props.key
        };
    }
	shouldComponentUpdate(nextProps, nextState) {
		this.logPropsAndState('shouldComponentUpdate: Counter');
		Logger.debug('nextState.counter: ', nextState.counter, ' nextState.isIncreasing: ', nextState.isIncreasing);
		return (nextState.counter >= this.props.min && nextState.counter <= this.props.max);
	}
	componentDidUpdate(prevProps, prevState) {
		this.logPropsAndState('componentDidUpdate: Counter');
		Logger.debug('prevState.counter: ', prevState.counter, ' prevState.isIncreasing: ', prevState.isIncreasing);
	}
	// up(e) {
	// 	if(this.state.counter < this.props.max) {
	// 	 	this.setState({
	// 	 		counter: this.state.counter + this.props.step,
	// 	 		isIncreasing: true
	// 	 	});
	// 	}
	// }
	// down(e) {
	// 	if(this.state.counter > this.props.min) {
	// 	 	this.setState({
	// 	 		counter: this.state.counter - this.props.step,
	// 	 		isIncreasing: false
	// 		});
	// 	}
	// }
	up(field) {
		return event => {
			if(this.state.counter < this.props.max) {
				const value = this.state.counter + this.props.step;
	            const state = { counter: value, isIncreasing: true };
	            this.refs[field].setState({ message: value });
	            this.setState(state);
	            this.props.up(event);
        	}
        };
	}
	down(field) {
		return event => {
			if(this.state.counter > this.props.min) {
				const value = this.state.counter - this.props.step;
		        const state = { counter: value, isIncreasing: false };
		        this.refs[field].setState({ message: value });
		        this.setState(state);
		        this.props.down(event);
			}
		};
	}
	logPropsAndState(callback) {
		Logger.debug('=> ', callback);
		Logger.debug('this.props.counter: ', this.props.counter);
		Logger.debug('this.state.isIncreasing: ', this.state.isIncreasing);
	}
	render() {
		const { dataClass, item, buttonLabelUp, buttonLabelDown, buttonPrefix, ...rest } = this.props;
        const { buttonClass, textClass, iconUpClass, iconDownClass, iconLabelUpClass, iconLabelDownClass, ...restClass } = dataClass;
        rest.dataClass = restClass;
		return (
			<div className={ this.state.isVisible ? 'show' : 'hidden' }>
				<div {...rest}>
					<BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.update(rest.name)} className={buttonClass}><BasicIcon className={iconUpdateClass} />{buttonLabelUpdate}</BasicButtonControl>
	        		<BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.edit(rest.name)} className={buttonClass}><BasicIcon className={iconEditClass} />{buttonLabelEdit}</BasicButtonControl>
					<br />
					<BasicText className={textClass} message={this.state.counter} />
					<BasicIcon className={this.state.isIncreasing ? iconLabelUpClass : iconLabelDownClass} />
				</div>
			</div>
		);
	}
};