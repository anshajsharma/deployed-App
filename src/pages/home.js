// Type rce to load whole snippets...

import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

//Components
import PrimarySearchAppBar from '../components/navbar'    // Navbar impoted
import Screams from '../components/screams/Screams'
import UserProfile from '../components/users/userProfile'

//Redux
import {connect} from 'react-redux'
import { getSingleScream , getScreams } from '../redux/actions/dataActions'


export class home extends Component {
 
   

    componentDidMount(){
        this.props.getScreams();
    }


    render() {
       const {screams,loading} = this.props.data;
    // let recentScreameMarkup = this.state.screams ? (this.state.screams.map(scream => <p>{scream.body}</p>)) : <p>Loading...</p>   //Old Version(show only body)
    // Now we want a proper setup for screams
    let recentScreameMarkup = !loading ? (screams.map(scream => <Screams key={scream.screamId} receivedScream ={scream} />  )) : <p>Loading...</p>
    // const classes = useStyles();
        return (
            
   <div>
     <PrimarySearchAppBar />
       <div className="grid-root">
        <Grid container spacing={3}>
             <Grid xs={false} item sm={false}  lg={3}>
                <Hidden  mdDown>
                     <Paper className="paper">mdDown</Paper>
                 </Hidden>
             </Grid>
             <Grid item xs={12} sm={9} lg={6}>
                    <Paper id="postSection" >{recentScreameMarkup}</Paper>   
             </Grid>
             <Grid item xs={false} sm={2} lg={3}>
                 <Hidden smDown> 
                     <Paper className="paper"> <UserProfile/> </Paper>
                 </Hidden>
             </Grid>
        </Grid>
     </div>
      
  </div>

        )
    }
}

home.propTypes={
    getSingleScream: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    data: state.data
})

export default connect(mapStateToProps , {getSingleScream,getScreams} ) (home)
