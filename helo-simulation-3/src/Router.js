import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Form from './Components/Form/Form'
import Post from './Components/Post/Post'
const Router = props => {
  return (

    <Switch>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/post/:id' component={Post} />
      <Route path='/new' component={Form} />
      <Route path='/' component={Auth} />
    </Switch>
  )
}
export default Router