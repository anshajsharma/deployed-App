import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI , LOADING_USER , SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const loginUser = (userData , history) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/signIn' , userData)
    .then(res =>{
      setAuthorizationHeader(res.data)    
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS})
      history.push('/')          //Reirects to home page........
    })
    .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
    });
}

export const signUpUser = (newUserData , history) => (dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/signUp' , newUserData)
    .then(res =>{
      setAuthorizationHeader(res.data.token)    
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS})
      history.push('/')          //Reirects to home page........
    })
    .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
    });
}


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
  .post('/user/uploadProfileImage', formData)
  .then(() => {
    dispatch(getUserData());
  })
  .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/addUserDetails', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// export const getuserData = () => (dispatch) =>{
//     axios.get('/getUserDetails')
//     .then(res =>{
//         dispatch({
//             type: SET_USER,
//             payload: res.data
//         })
//     })
//     .catch(err =>{
//         console.log('here.....................');
//         console.log(err);
//     })
// }
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/getUserDetails')
      .then((res) => {
          console.log(res.data);
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => 
      {
        console.log('here...getUserData Error..')
        console.log(err)
    });      
  };




  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);  // Saving tokenId locally in browser so that if we close window it can be recovered
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };