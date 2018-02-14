"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Logger from 'appRoot/js/mixins/logger';
import BasicHeader from 'appRoot/js/components/elements/basicHeader';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicEditTextControl from 'appRoot/js/components/controls/basicEditTextControl';

let Types = React.PropTypes;

export default class BasicView extends React.Component {
	displayName: 'BasicView'
	static propTypes: {
		fields: Types.array,
		item: Types.object
    }
    static defaultProps = {
        fields: [
			{
				id: '1',
				name: 'firstName',
				label: 'First Name',
				ref: 'firstName',
				placeholder: 'First Name',
				// textBoxClassName: '',
				// buttonClassName: '',
				value: ''
			},
			{
				id: '2',
				name: 'lastName',
				label: 'Last Name',
				ref: 'lastName',
				placeholder: 'Last Name',
				// textBoxClassName: '',
				// buttonClassName: '',
				value: ''
			}
		],
		item: {}
    }
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            fields: props.fields,
			item: props.item
        };
    }
	update(field) {
		// var fieldName = e.target.name.substring(1);
		// this.state.fields[fieldName].value = this.refs[fieldName].refs['t' + fieldName].props.value;
		// this.setState({ fields: this.state.fields });
		const self = this;
		return function (event) {
			var state = {};
			state[field] = event.target.value;
			self.setState(state);
		};
	}
	reload() {
		// ReactDOM.unmountComponentAtNode(document.getElementById('view'));
		// ReactDOM.render(<ValidationView />, document.getElementById('view'));
	}
	render() {
		const header = this.props.fields.map(function(item) {
			return item.value;
		}.bind(this)).join(' ');
		const editFields = this.props.fields.map(function(item) {
			return (
				<BasicEditTextControl item={item} key={item.id} name={item.name} label={item.label} update={this.update.bind(this, item.name)} placeholder={item.placeholder} getValidationMessages={this.props.getValidationMessages} onChange={this.props.onChange} />
			);
		}.bind(this));
		return (
			<div>
				<BasicHeader message={'Hello ' + header}></BasicHeader>
					{editFields}
				<BasicButtonControl onClick={this.reload} className='btn btn-primary'>Reload</BasicButtonControl>
			</div>
		);
	}
}