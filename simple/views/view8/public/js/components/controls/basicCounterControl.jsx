"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicText  from 'appRoot/js/components/elements/basicText';
import BasicIcon  from 'appRoot/js/components/elements/basicIcon';
import BasicCounterControlStyle from 'appRoot/css/components/controls/basicCounterControl';

import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicCounterControlStyle);

export default const BasicCounterControl extends React.Component {
	displayName: 'BasicCounterControl'
	static propTypes: {
		dataClass: Types.object,
		counter: Types.number,
		min: Types.number,
		max: Types.number,
		step: Types.number,
		isVisible: Types.bool,
		onUp: Types.func,
        onDown: Types.func,
        buttonLabelUp: Types.string,
        buttonLabelDown: Types.string,
		buttonPrefix: Types.string,
		item: Types.object
    }
    static defaultProps = {
    	dataClass: { buttonClass: 'btn', textClass: 'text', iconClass: 'icon', iconLabelUpClass: 'glyphicon glyphicon-circle-arrow-up', iconLabelDownClass: 'glyphicon glyphicon-circle-arrow-down', iconUpClass: 'glyphicon glyphicon-thumbs-up', iconDownClass: 'glyphicon glyphicon-thumbs-down' },
    	className: 'counter',
        counter: 0,
        min: Number.MIN_VALUE,
        max: Number.MAX_VALUE,
        step: 1,
        isIncreasing: false,
		isVisible: false,
		onUp: null,
        onDown: null,
		buttonLabelUp: 'Up',
        buttonLabelDown: 'Down',
		buttonPrefix: 'btn',
		item: {}
    }
    constructor(props) {
        super(props);
        this.onUp = this.onUp.bind(this);
        this.onDown = this.onDown.bind(this);
        this.state = {
        	dataClass: props.dataClass,
        	className: props.className,
            counter: props.counter,
            min: props.min,
            max: props.max,
            step: props.step,
            isIncreasing: false,
            isVisible: props.isVisible,
            onUp: props.onUp,
            onDown: props.onDown,
            buttonLabelUp: props.buttonLabelUp,
            buttonLabelDown: props.buttonLabelDown,
            buttonPrefix: props.buttonPrefix,
			item: props.item
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
	onUp(field) {
		return event => {
			if(this.state.counter < this.props.max) {
				const value = this.state.counter + this.props.step;
	            const state = { counter: value, isIncreasing: true };
	            this.refs[field].setState({ message: value });
	            this.setState(state);
	            if(this.props.onUp) {
	                this.props.onUp(event);
	            }
        	}
        };
	}
	onDown(field) {
		return event => {
			if(this.state.counter > this.props.min) {
				const value = this.state.counter - this.props.step;
		        const state = { counter: value, isIncreasing: false };
		        this.refs[field].setState({ message: value });
		        this.setState(state);
		        if(this.props.onDown) {
	                this.props.onDown(event);
	            }
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
        const { buttonClass, textClass, ...restClass } = dataClass;
        const iconButtonClass = Styles(dataClass.iconButtonClass, {
            iconUpClass: this.state.isIncreasing,
            iconDownClass: this.state.isIncreasing
        });
        const iconClass = Styles(dataClass.iconClass, {
            iconLabelUpClass: this.state.isIncreasing,
            iconLabelDownClass: this.state.isIncreasing
        });
		return (
			<div {...rest}>
				<BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.onUp(rest.name)} className={buttonClass}><BasicIcon className={iconButtonClass} />{buttonLabelUpdate}</BasicButtonControl>
	        	<BasicButtonControl ref={(button) => {this.textButton = button}} name={buttonPrefix + rest.name} onClick={this.onDown(rest.name)} className={buttonClass}><BasicIcon className={iconButtonClass} />{buttonLabelEdit}</BasicButtonControl>
				<br />
				<BasicText className={textClass} message={this.state.counter} />
				<BasicIcon className={iconClass} />
			<div>
		);
	}
};