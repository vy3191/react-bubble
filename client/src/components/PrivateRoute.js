import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {token} from '../constants/localStorage';

export default function PrivateRoute({component:Component, ...rest}) {
   return(
     <Route {...rest} render={ (props) => {
          if(token) {
             return <Component {...props} />
          } else {
             return <Redirect to='/login' />
          }
     }} />
   )
}