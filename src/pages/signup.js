import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types'
import appIcon from '../images/logo.png'
import {Link} from 'react-router-dom'
//Redux stuff
import {connect} from 'react-redux'
import {signUpUser} from '../redux/actions/userActions'

//MUI 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// const styles= (theme)=> ({
//     ...theme                           // As same style is shared by login ans signup.. I copied that in global variable 'theme' in app.js
// })

const styles={
    form:{
      textAlign: 'center',
    },
    image:{
      maxWidth:130,
    },
    title:{
      marginBottom: 20,
    },
    textField:{
      margin: '10px auto 10px auto' 
    },
    button:{
      marginTop: "20px",
      position: 'relative'
    },
    customError:{
      color:'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    circularProgress:{
      position: 'absolute'
  
    }
  };

 
const handleChange = (event) =>{
  console.log('Hi');
}

export class signup extends Component {
  constructor(){
    super();
    this.state={
      email: '',
      password:'',
      confirmPassword:'',
      userHandle:'',
      errors:{}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) =>{
    // Stop default form submit behaviour and stop reloading of page
    event.preventDefault(); 
    const newUserData = {
      email:this.state.email,
      password:this.state.password,
      confirmPassword:this.state.confirmPassword,
      userHandle:this.state.userHandle
    }
    this.props.signUpUser(newUserData,this.props.history);

  }
  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    const { classes , UI:{loading} } = this.props;
    const {errors  } = this.state;
        return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm xs={12}>
          <img className={classes.image} src={appIcon} alt="social icon" />
          <Typography variant="h3" className={classes.title} >
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            {/* // in TextField helperText is used to give hints or set errors */}
            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email}
              error={errors.email?true:false}  value={this.state.email} onChange={this.handleChange} fullWidth />
            <TextField id="password" name="password" type="password" label="Password" className={classes.textField} helperText={errors.password}
               error={errors.password?true:false} value={this.state.password} onChange={this.handleChange} fullWidth />
            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField} helperText={errors.confirmPassword}
               error={errors.confirmPassword?true:false} value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />
            <TextField id="userHandle" name="userHandle" type="text" label="Handle" className={classes.textField} helperText={errors.userHandle}
               error={errors.userHandle?true:false} value={this.state.userHandle} onChange={this.handleChange} fullWidth />
             {errors.err && (
               <Typography variant="body2" className={classes.customError}>{errors.err}</Typography>
             ) }
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Signup
              {loading && (
              <CircularProgress size={30} className={classes.circularProgress}/>
            )}
              </Button>
            <br/>
            <small>Already have an account ? sign in <Link to="/login">here</Link> </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

// signup.propTypes = {
//   classes: PropTypes.object.isRequired
// }

// export default withStyle(styles)(signup);

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(signup));
