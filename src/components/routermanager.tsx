import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Cookies from 'js-cookie';

import Async from './async'; 
import Login from '../templates/login/login';

export const publicPath: Array<String> = [
    '/login'
]

export const getSession = () => {
    const jwt = Cookies.get('__zaplin_session')
    let session
    try {
        if (jwt) {
            const base64Url = jwt.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            session = JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log('[getSession error]',error)
        return session
    }
    return session
}

const PrivateRoute = (props: any) => {
    const { location } = props
    return (
        getSession() && publicPath.indexOf(location.pathname) === -1 ? 
        <Route {...props} /> :
        <Redirect to="/login" />
    )
}

@inject('session') @observer
class RouterManager extends PureComponent<any, any> {
    render() {
        const { location } = this.props
        return (
            <TransitionGroup>           
                <CSSTransition key={location.pathname} classNames="bounce" timeout={500}>
                    <div className="container-wrapper">
                        <Switch location={location}>
                            <Route path="/login" component={Login} />
                            <PrivateRoute exact path={`/:module?/:type?/:id?`} render={(props: any) => <Async key={location.pathname} param={props} />} />
                        </Switch>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default withRouter(RouterManager)