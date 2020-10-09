import React, {useEffect, useState} from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import Welcome from "Pages/welcome/welcome";
import Motd from "Pages/motd/motd";
import Localization from "Pages/localization/localization";
import UndoRedo from "Pages/undoredo/undoredo";
import ContextMenu from "Pages/contextmenu/contextmenu";

import SignIn from "Pages/signIn/signIn";
import SignUp from "Pages/signUp/signUp";
import ProtectedRoute from "Components/protectedRoute/protectedRoute"

import {HTTP} from '../HTTP/http';

function Routes() {

  const [state, setState] = useState({
    isAuthenticated: false,
    isLoading: true
});

const token = localStorage.getItem('token')
//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRmZjAwNWUxMTQ0ZTFhZDg3MDllN2YiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MDE3MzU2OTIsImV4cCI6MTYwMTczOTI5Mn0.bmqGy9VSJnazPwcveTA1Uf29NE4Iy5DxXVNIrkexuxU"


const requestBody = {
    query: `query {
    verifyUser(token: "${token}") {
      firstName
    }
  }`
}

  useEffect(()=> {
    HTTP.post(requestBody, token)
        .then(response => {
            if(response.errors) {
              setState({isAuthenticated: false, isLoading: false})
            } else {
              setState({isAuthenticated: true, isLoading: false});
            }
        })
        .catch((err) => {
            console.log('Verification err: ' + err);
            setState({isAuthenticated: false, isLoading: false})//    history.push('/');
        })
}, [])

  useEffect(()=> {
    console.log('State changed');
    console.log(state);
  },[state])



 // render() {
    return (
      <Switch>
        <Route exact path={"/"} component={SignIn}></Route>
        <ProtectedRoute exact path={"/home"} component={Welcome} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>
        <Route exact path={ROUTES.SIGNUP} component={SignUp} ></Route>
        <Route path={ROUTES.MOTD} component={Motd}></Route>
        <Route path={ROUTES.LOCALIZATION} component={Localization}></Route>
        <Route path={ROUTES.UNDOREDO} component={UndoRedo}></Route>
        <Route path={ROUTES.CONTEXTMENU} component={ContextMenu}></Route>
      </Switch>
    );
 // }
}

export default Routes;
