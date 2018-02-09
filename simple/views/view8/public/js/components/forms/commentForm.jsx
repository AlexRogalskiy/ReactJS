"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';
import Validators from 'appRoot/js/mixins/validators';

import BasicTextControl from 'appRoot/js/controls/basicTextControl';
import BasicButtonControl from 'appRoot/js/controls/basicButtonControl';

import HelpText   from 'appRoot/js/mixins/utility';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

class CommentForm extends React.Component {
  displayName: 'CommentForm'
  static propTypes: {
    dataClass: Types.object,
    fields: Types.array,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    dataClass: { fieldClass: 'field' },
    fields: [],
    item: {},
    key: ''
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      dataClass: this.props.dataClass,
      fields: this.props.fields,
      item: this.props.item,
      key: this.props.key
    };
  }
  onChange(e) {
    let val = e.target.value;
    this.setState({fields[e.target.name]: val});
  }
  onSubmit(e) {
    e.preventDefault();
    Logger.debug("Fields: " + this.state.fields.inspect);
  }
  render() {
    const self = this;
    const { dataClass, fields, ...rest } = this.props;
    const { fieldClass, ...restClass } = dataClass;
    return (
      <form onSubmit={rest.onSubmit ? rest.onSubmit : self.onSubmit}  {...rest}>
          <div>
            fields.map(function(item) {
              return <BasicTextControl item={item} key={item.id} label={item.label} onChange={rest.onChange ? rest.onChange : self.onChange} className={item.className ? item.className : fieldClass} dataClass={restClass} />
            });
          </div>
          <input type="submit" value="Send" />
      </form>
    );
  }
};

export default Validation(Strategy)(CommentForm);