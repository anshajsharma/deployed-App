import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

//MUI stuff
import Button from '@material-ui/core/Button'
import { Paper, IconButton } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

//Components
import EditDetails from './EditDetails'

//Redux
import { connect } from 'react-redux'
import {logoutUser , uploadImage } from '../../redux/actions/userActions'


const styles={
    invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
    profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          width: '50%',
          height: 'auto',
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
};
// const styles = (theme) => ({
//     ...theme
//   });

 class UserProfile extends Component {

  addDefaultSrc(ev){
    ev.target.src = 'https://firebasestorage.googleapis.com/v0/b/blog-ape.appspot.com/o/avtar.jpg?alt=media'
  }
   
  
    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        // if(image)
        formData.append('image',image , image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();          // It will chick the hidden choose file button and allow us to choose pic 
    };
    handleLogout = () => {
      this.props.logoutUser();
    };
    render() {
        const  { classes , user: {
            credentials: { userHandle, createdAt, imageUrl, bio, website, location },
            loading,
            authenticated
          } } = this.props;
        // console.log(user);
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>

            <div className="image-wrapper">
              <img src={imageUrl} onError={this.addDefaultSrc}
 alt="profile" className="profile-image" />
              
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                accept="image/*"
                onChange={this.handleImageChange}
              />
              <Tooltip title="Edit Profile Picture" placement="top">
                 <IconButton onClick={this.handleEditPicture} className="button">
                     <EditIcon color="primary" />
                 </IconButton>   
              </Tooltip>
              {/* <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton> */}
            </div>
                    <div className="profile-details">
                     @<MuiLink component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                            {userHandle}
                        </MuiLink> 
                        <hr/>
                 
                  {bio && <Typography variant="body2">{bio} </Typography> }
                  <hr/>

                  {location && ( <Fragment>
                    <LocationOn color="primary"/>  <span>{location}</span> <hr/>
                  </Fragment> )}

                  {website && ( <Fragment>
                    <LinkIcon color="primary"/>  <a href={website} 
                    target="_blank"  // this will help to open href in another window
                    rel="noopener noreferrer" >{website}</a> <hr/>
                  </Fragment> )}

                    <CalendarToday color="primary"/>{' '}
                    <span>
                        Joined {dayjs(createdAt).format('MMM YYYY')}
                    </span>

                    </div>
                    <Tooltip title="Log Out" placement="top">
                      <IconButton onClick={this.handleLogout}>
                        <KeyboardReturn color="primary" />
                      </IconButton>
                    </Tooltip>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                         signup
                    </Button>
                </div>
            </Paper>
         )) : (<p>loading....</p>)
        return profileMarkup;
    }
}

// UserProfile.PropType= {
//     user: PropType.object.isRequired,
//     classes: PropType.object.isRequired
// }

// const mapStateToprops = (state) => ({
//     user:state.user
// })

// export default connect(mapStateToprops)(withStyles(styles) (UserProfile))

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser , uploadImage };

UserProfile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect( mapStateToProps,mapActionsToProps)(withStyles(styles)(UserProfile));
