import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { Label } from './label';


@inject('session') @observer
export default class Dashboard extends Component<any> {
    render() {
        const { session } = this.props
        return (
            <div className="content">Halo <Label className="bold">{session.auth.fullname}</Label> !</div>
        )
    }
}
