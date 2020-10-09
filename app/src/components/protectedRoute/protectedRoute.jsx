import React, {useState, useEffect} from 'react';
import { Route, Redirect } from "react-router-dom";
import Loader from "Components/loaders/loader";
import Auth from "../../auth/auth";

// Returning a route with the component that is passed in ( e.g.Home component)

function ProtectedRoute({component: Component, isAuthenticated, isLoading, ...rest }) {

    return (
        <Route
            {...rest}
            render={
              props => {

                  console.log('Loading?: ' + isLoading)
                  console.log('Auth?: ' + isAuthenticated)

                  if(isLoading) {
                      return <Loader/>
                  }

                  if(isAuthenticated || Auth.isAuthenticated()) {
                      return <Component {...props }/>
                  } else {
                      return <Redirect to={
                          {
                              pathname: "/signup",
                              state: {
                                  from: props.location
                              }
                          }
                      }/>
                  }
            }
        }  />
    )
}

export default ProtectedRoute;