import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios'
import PropTypes from 'prop-types'

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

//Redux
import {connect} from 'react-redux'
import { likeScream , unlikeScream , getSingleScream , deleteScream} from '../../redux/actions/dataActions'
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import { Avatar, CardHeader, IconButton, MenuItem, Menu } from '@material-ui/core';

const useStyles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
    card: {
        display: 'flex',
        marginBottom: 20,
        position:'relative'
    },
    image:{
        // minWidth: ,
        padding:20,
        maxWidth: '95%',
        height: 'auto',
        border: 2,
        borderRadius: '4px',
    //   padding: 5px;

    },
    content:{
        padding: '2px 20px 2px 20px', //Top Right Botton Left
        length:'100%',
        heeght:'auto'
    },
    avatar:{
        // verticalAlign: 'middle',
        padding: '15px 0px 0px 15px',  //Top Right Botton Left
        // width: '40px',
        // height: '40px',
        // borderRadius: '50%',
    },
    asdf:{
        display: 'flex',
        width:'100%',
        elevation: '3px'
       
    },
    headerData:{
        padding: '10px 0px 2px 20px'  //Top Right Botton Left
    },
    settings:{
        position: 'absolute',
       left: '90%',
       top: '15px'
    },
    // likeRectionBox:{
    //     position: 'relative',
    // }
};

export class screams extends Component {
    constructor(){
        super();
        this.state={
          likedorNot: false,
          open: false,
          image: false
        }
      }
     
    handleClick = () => {
        this.setState({open:true})
        // this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = (event) => {
       this.setState({open:false})
       console.log()
    //    this.mapUserDetailsToState(this.props.credentials);
   }
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(
            (like)=> like.screamId===this.props.receivedScream.screamId
        ))
        return true;
        return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.receivedScream.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.receivedScream.screamId);
    }

    addDefaultSrc(ev){
        ev.target.src = 'https://firebasestorage.googleapis.com/v0/b/blog-ape.appspot.com/o/avtar.jpg?alt=media'
    }


    
      
     

    render() {
        const {scream:{likes}} = this.props.data;
        const c='userHandle';
        const {classes ,user:{credentials}, receivedScream : {body,createdAt,postImage ,userImage,commentsCount,likesCount,screamId,userHandle  } ,
                               user:{authenticated  }  } =  this.props;
        // console.log('LLLLLLLLLLLLLIIIIIIIIIIIKKKKKKKKKKKKKKKKKEEEEEEEEEEEEEESSSSSSSSSSSSSSS');
        // console.log(likes);
        // console.log(this.state.likedorNot);
        
        
        dayjs.extend(relativeTime);

        const likeButton = 
            !authenticated ?(<MyButton tip="like"><Link to='/login'> <FavoriteBorder color="primary" /> </Link> </MyButton>):(
                this.likedScream() ? (
                    <MyButton tip="Undo like" onClick={this.unlikeScream}>
                        <FavoriteIcon color="primary" />
                    </MyButton>
                ):(
                    <MyButton tip="like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
                </MyButton> 
                )
            );
            const likeButton2 = 
            !authenticated ?(<MyButton tip="like"><Link to='/login'> <FavoriteBorder color="primary" /> </Link> </MyButton>):(
                this.likedScream() ? (
                    <MyButton tip="Undo like" onClick={this.unlikeScream}>
                        <ThumbUpIcon color="primary" />
                    </MyButton>
                ):(
                    <MyButton tip="like" onClick={this.likeScream}>
                    <ThumbUpAltOutlinedIcon color="primary" />
                </MyButton> 
                )
            );
        const deleteButton = 
          authenticated && credentials.userHandle === userHandle ?(
              <DeleteScream screamId={screamId} />
          ):(null)
        
      
        return (
            
                <Card className={classes.card}>
                    {deleteButton}
                    <div>

                   
                   <div id="raisedBox" className={classes.asdf}>
                   <div className={classes.avatar}> <Avatar  src={userImage} onError={this.addDefaultSrc} /> </div> 
                   {/* <img className={classes.avatar} src={userImage} onError={this.addDefaultSrc} />  */}
                   <div className={classes.headerData}>
                   <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>    
                   <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography> 
                   </div>
                   <IconButton aria-label="settings" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} className={classes.settings}>
                   <MoreVertIcon />
                   </IconButton>
                   <Menu
                   id="simple-menu"
                //    anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'botton',
                    horizontal: 'center',
                  }}
                //   transformOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'center',
                //   }}
                   keepMounted
                   open={Boolean(this.state.open)}
                   onClose={this.handleClose}
                   >
                   <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                   <MenuItem onClick={this.handleClose}>My account</MenuItem>
                   <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                   </Menu>
                   
                   </div>
                   
                    
                    
                    <CardContent className={classes.content}>
                    {!postImage?(<Typography variant="h4" >{body}</Typography>):<Typography variant="h5" >{body}</Typography>}    
                    {/* <Typography variant="h5" >{body}</Typography> */}
                    {postImage?<CardMedia
                    src={postImage}
                    component="img"
                    onError={this.addDefaultSrc}
                    className = {classes.image}
                    // title="Profile Image" 
                    />:null} 
                        
                        <span> {likeButton} {likesCount} likes  </span>
                        <MyButton tip="comment">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span>{commentsCount} comments </span>
                        <ScreamDialog screamId={screamId} userHandle={userHandle} />
                    </CardContent>
                    </div>
                  
                    <div class="boxFB">
                    <input type="checkbox" id="like" class="field-reactions"/>
                    <h3 class="text-desc">Press space and after tab key to navigation</h3>
                    <label for="like" class="label-reactions">{likeButton2}</label>
                    <div class="toolbox"></div>
                    <label class="overlay" for="like"></label>
                    <button class="reaction-like"><span class="legend-reaction">Like</span></button>
                    <button class="reaction-love"><span class="legend-reaction">Love</span></button>
                    <button class="reaction-haha"><span class="legend-reaction">Haha</span></button>
                    <button class="reaction-wow"><span class="legend-reaction">Wow</span></button>
                    <button class="reaction-sad"><span class="legend-reaction">Sad</span></button>
                    <button class="reaction-angry"><span class="legend-reaction">Angry</span></button>
                    </div>
                </Card>
            
        )
    }
}

screams.propTypes = {
  classes: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getSingleScream:PropTypes.func.isRequired,
  receivedScream:  PropTypes.object.isRequired,
  deleteScream:  PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>({
    user: state.user, data: state.data
})

const mapActionsToProps = ({
    likeScream , unlikeScream , getSingleScream , deleteScream
})

export default connect(mapStateToProps,mapActionsToProps) (withStyle(useStyles)(screams))
