import React, {useEffect, useState} from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router";
import ROUTES from "Constants/routes";
import Welcome from "Pages/welcome/welcome";
import Motd from "Pages/motd/motd";
import Localization from "Pages/localization/localization";
import UndoRedo from "Pages/undoredo/undoredo";
import ContextMenu from "Pages/contextmenu/contextmenu";

import SignIn from "Pages/signIn/signIn";
import SignUp from "Pages/signUp/signUp";
import ProtectedRoute from "Components/protectedRoute/protectedRoute"
import Receipts from "Pages/receipts/receipts";

import Drawer from "Components/drawer/drawer"

import MiniDrawer from "Components/drawer/miniDrawer"

import Auth from "../auth/auth"

import HTTP from '../HTTP/http';

function Routes() {

  const [state, setState] = useState({
      isAuthenticated: false,
      isLoading: true
  });


  const token = localStorage.getItem('token')
  //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRmZjAwNWUxMTQ0ZTFhZDg3MDllN2YiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MDE3MzU2OTIsImV4cCI6MTYwMTczOTI5Mn0.bmqGy9VSJnazPwcveTA1Uf29NE4Iy5DxXVNIrkexuxU"

  /*const requestBody2 = `query {
      verifyUser(token: "${token}") {
        firstName
      }
    }`;*/

    const requestBody = HTTP.user.verifyUserAndReturnFields('firstName', {token: token})
    //console.log(requestBody)

  useEffect(()=> {
      HTTP.post(requestBody)
          .then(response => {
              if(response.errors) {
                setState({isAuthenticated: false, isLoading: false})
              } else {
                setState({isAuthenticated: true, isLoading: false});
              }
          })
          .catch((err) => {
              console.log('Token expired')
              console.log('Verification err: ' + err);
              setState({isAuthenticated: false, isLoading: false})//    history.push('/');
          })
  }, [])

    useEffect(()=> {
      console.log('State changed');
      console.log(state);
    },[state])

   // <Route exact path="/" render={() => <Redirect to="/login" />} />        <Route exact path="/" component={SignIn}/>




    const LoginContainer = () => (
      <>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={SignIn} />
        <Route exact path={ROUTES.SIGNUP} component={SignUp} ></Route>
      </>
    )

    //{ state.isLoading ? null : <Drawer key={1}/> }

    const DefaultContainer = () => (
      <>
      { state.isLoading ? null : <MiniDrawer key={1}/> }
        <ProtectedRoute exact path={"/receipts"} component={Receipts} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>
        <ProtectedRoute exact path={"/home"} component={Welcome} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>
        <ProtectedRoute exact path={"/"} component={Welcome} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>

        <Route path={ROUTES.MOTD} component={Motd}></Route>
        <Route path={ROUTES.LOCALIZATION} component={Localization}></Route>
        <Route path={ROUTES.UNDOREDO} component={UndoRedo}></Route>
        <Route path={ROUTES.CONTEXTMENU} component={ContextMenu}></Route>
      </>
   )

   // { !loc || loc === 'signup'  ? null : <Drawer key={Math.random()}/> }
  // { !state.isAuthenticated || state.isLoading || loc === "" || loc === 'signup' ? null : <Drawer key={Math.random()}/> }
 // { state.isAuthenticated || Auth.isAuthenticated() && !state.isLoading && loc !== "" && loc === 'signup' ? <Drawer key={Math.random()}/> : null }
 //{ state.isAuthenticated || Auth.isAuthenticated() && !state.isLoading && loc !== "" && loc !== 'signup' ? <Drawer key={Math.random()}/> : null }

   /* return (
      <>
      { loc !== "" && loc !== 'signup' ? <Drawer key={Math.random()}/> : null }

      <Switch>
        <Route exact path={"/login"} component={SignIn}></Route>
        <Route exact path={ROUTES.SIGNUP} component={SignUp} ></Route>
        <ProtectedRoute exact path={"/receipts"} component={Receipts} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>
        <ProtectedRoute exact path={"/home"} component={Welcome} isAuthenticated={state.isAuthenticated} isLoading={state.isLoading}></ProtectedRoute>
        <Route path={ROUTES.MOTD} component={Motd}></Route>
        <Route path={ROUTES.LOCALIZATION} component={Localization}></Route>
        <Route path={ROUTES.UNDOREDO} component={UndoRedo}></Route>
        <Route path={ROUTES.CONTEXTMENU} component={ContextMenu}></Route>
      </Switch>
      </>
    );*/

    return (

      <Switch>
        <Route exact path={"/(login)"} component={LoginContainer}></Route>
        <Route exact path={ROUTES.SIGNUP} component={LoginContainer} ></Route>
        <Route component={DefaultContainer}/>
      </Switch>

    )
}

export default Routes;
