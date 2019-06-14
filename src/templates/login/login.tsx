import React, { Component } from 'react';
import { Input, Checkbox, Button, message } from 'antd';
import { inject, observer } from 'mobx-react';
import Cookies from 'js-cookie';

import { post } from '../../components/xhr';


@inject('session','login') @observer
export default class Login extends Component<any> {

    _handleAuth() {
        const { session, login, history } = this.props
            post('login', login.input, (res: any) => {
                if (res.status === true) {
                    session.auth = res.content
                    Cookies.set('__zaplin_session', res.content.token)
                    history.push('/')
                } else {
                    message.warning(res.content);
                }
            }, (err: any) => {
                console.log(err)
                message.error('Tidak dapat terhubung dengan server.')
            })
    }

    render() {
        const { login } = this.props
        return (
            <div className="dashboard">
                <div className="center-it">
                    <div className="loginbox">
                        <div className="row">
                            <Input id="email" value={login.input.email || ''} onChange={login.handleInput} placeholder="Email" size="large" />
                        </div>
                        <div className="row">
                            <Input id="password" value={login.input.password || ''} onChange={login.handleInput} placeholder="Password" size="large" type={login.showPassword === true ? 'text' : 'password'} />
                        </div>
                        <div className="flex-row row">
                            <div className="row noselect">
                                <Checkbox onChange={login.toggleShow}>{`Tampilkan`} Password</Checkbox>
                            </div>
                            <div className="row right">
                                <Button onClick={this._handleAuth.bind(this)} type="primary">Masuk</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}