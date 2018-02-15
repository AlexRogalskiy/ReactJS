"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';
import BasicLoaderStyle from 'appRoot/css/components/elements/basicLoader';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicLoaderStyle);

export default class BasicLoader extends React.Component {
	displayName: 'BasicLoader'
	static propTypes: {
		dataClass: Types.object,
        item: Types.object
	}
	static defaultProps = {
		dataClass: { innerClass: 'loader-container'},
		className: 'loader',
		inline: true,
        item: {}
    }
	constructor(props) {
        super(props);
        this.state = {
        	dataClass: props.dataClass,
        	className: props.className,
        	inline: props.inline,
            item: props.item
        };
    }
	render() {
		const { item, inline, ...rest } = this.props;
		const innerClass = Styles(dataClass.innerClass, {
            inline: inline
        });
		return (
			<div {...rest}>
				<div className={innerClass}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	}
};

