"use strict";
const React = require("react");
const ReactDOM = require("react-dom")
const Joi = require("joi");
const JoiValidationStrategy = require("joi-validation-strategy");
const ReactValidationMixin = require("react-validation-mixin");

const ValidatedInput = React.createClass({
    renderHelpText: function(message) {
        return (
            <span className="help-block">
                {message}
            </span>
        );
    },
    render: function() {
        var error = this.props.getValidationMessages(this.props.name);
        var formClass = "form-group";

        if (error.length > 0) {
            formClass = formClass + " has-error";
        }

        return (
            <div className={formClass}>
                <label className="control-label" htmlFor={this.props.name}>
                    {this.props.label}
                </label>
                <input className="form-control" {...this.props}/>
                {this.renderHelpText(error)}
            </div>
        );
    }
});

const Demo = React.createClass({
  validatorTypes: {
    userName: Joi.string().required()
        .label("User Name"),
    password: Joi.string().required()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .label("Password")
  },
  getValidatorData: function() {
    return this.state;
  },
  getInitialState: function() {
    return {
      userName: "",
      password: ""
    };
  },
  onSubmit(event) {
    event.preventDefault();

    // Handle field level validations
    var onValidate = function(error) {

        if (error) {
            if (error.userName) {
                alert(error.userName);
            }

            if (error.password) {
                alert(error.password);
            }
        }

        // Handle form level validations
        var passwordContainsUserName
            = this.state.password.indexOf(
                this.state.userName) > -1;

        if (this.state.userName
            && passwordContainsUserName) {
            alert("Password cannot contain the user name.");
            return;
        }

        if (!error) {
            alert("Account created!");
        }
    };

    this.props.validate(onValidate.bind(this));
  },
  onChange: function(event) {
    var state = {};

    state[event.target.name] = event.target.value;
    
    this.setState(state);
  },
  render: function() {
    return (
        <div className="container">
            <form onSubmit={this.onSubmit}>
                <ValidatedInput 
                    name="userName"
                    type="text" 
                    ref="userName" 
                    placeholder="Enter User Name" 
                    label="User Name"
                    value={this.state.userName}
                    onChange={this.onChange}
                    onBlur={this.props.handleValidation("userName")}
                    getValidationMessages=
                        {this.props.getValidationMessages}/>
                <ValidatedInput 
                    name="password"
                    className="form-control"
                    type="text" 
                    ref="password" 
                    placeholder="Enter Password" 
                    label="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    onBlur={this.props.handleValidation("password")}
                    getValidationMessages=
                        {this.props.getValidationMessages}/>
                <button className="btn btn-success" type="submit">
                    Submit
                </button>
            </form>
        </div>
        ); 
  }
});

const ValidationDemo = ReactValidationMixin(JoiValidationStrategy)(Demo);
ReactDOM.render(<ValidationDemo/>, document.getElementById("view"));