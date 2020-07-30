import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/home'
import Layout from './hoc/layout'
import MoviesView from './components/movies'
import Login from './containers/admin/login'
import Auth from './hoc/auth'
import User from './components/admin'
import Addreview from '././containers/admin/add'
import UserPost from './components/admin/userPost'
import EditMovie from './containers/admin/edit'
import Register from './containers/admin/register'
import Logout from './components/admin/logout'

const Routes = () =>{
    return(
        <Layout>
            <Switch>
                <Route path='/' exact component={Auth(Home,null)} />
                <Route path='/login' exact component={Auth(Login,false)} />
                <Route path ='/user/logout' exact component={Auth(Logout,true)}/>
                <Route path ='/user' exact component={Auth(User,true)}/>
                <Route path ='/user/add' exact component={Auth(Addreview,true)}/>
                <Route path ='/user/register' exact component={Auth(Register,true)}/>
                <Route path ='/user/editPost/:id' exact component={Auth(EditMovie,true)}/>
                <Route path='/movies/:id' exact component={Auth(MoviesView,null)} />
                <Route path ='/user/user-reviews' exact component={Auth(UserPost,true)}/>
            </Switch>
        </Layout>
    
    )
}
export default Routes