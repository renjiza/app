import React, { PureComponent } from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Login from '../templates/login/login';
import Async from './async'; 

function PrivateRoute(props: any) {
    const { location } = props
    return (
        // getSession() && publicPath.indexOf(location.pathname) === -1 ?
            true ?
            <Route {...props} /> :
            <div>Please login first, <Link to="/login">Click here</Link> to login</div>
    )
}

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