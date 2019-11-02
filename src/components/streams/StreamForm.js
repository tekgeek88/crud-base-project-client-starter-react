import React from 'react';
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component {
  renderError({error, touched}) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input}/>
        {/*<div>{meta.error}</div>*/}
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter title: "/>
        <Field name="description" component={this.renderInput} label="Enter description: "/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const doValidate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    // Runs if the user doesn't enter a title
    errors.title = 'You must enter a title';
  }
  if (!formValues.description) {
    // Runs if the user doesn't enter a title
    errors.description = 'You must enter a description';
  }
  return errors;
};



// Option 1: Wrap the whole redux form in the callback that gets returned
// export default connect()(reduxForm({
//   form: 'streamCreate',
//   validate: doValidate
// })(StreamCreate));

// Option 2: create a wrapper object to wrap a second object
export default reduxForm({
  form: 'streamForm',
  validate: doValidate
})(StreamForm);