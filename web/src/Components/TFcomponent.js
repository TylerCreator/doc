import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit*2,
    marginLeft: theme.spacing.unit*2,
  },
});

class TFcomponent extends Component {
    constructor(props) {
      super(props);
       this.ch =this.ch.bind(this);
    }
    ch(event){
      this.props.onChange(this.props.id,event.target.value)
    }
    render() {
      return (
        <TextField
          id={`textarea_${this.props.id}`}
          // label={d.label}
          // placeholder="`Иванов Иван Иванович"
          helperText={this.props.helper}
          multiline
          className={this.props.classes.textField}
          margin="normal"
          onChange={this.ch}
        /> 
      );
      return null;
    }
  }
  TFcomponent.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    helper: PropTypes.string.isRequired
  }

  export default withStyles(styles, { withTheme: true })(TFcomponent);
