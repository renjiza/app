import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Menu } from 'antd';
import Cookies from 'js-cookie';

import './App.scss';
import RouterManager from './components/routermanager';
import { get } from './components/xhr';

const { Header, Sider, Content } = Layout;

@inject('session') @observer
class App extends PureComponent<any, any> {

	_renderHeader() {
		if (this.props.session.auth.isLogged === true) {
			return (<Header className="header"><h2>xTask</h2></Header>)
		}
	}

	_renderSider() {
		if (this.props.session.auth.isLogged === true) {
			return (
				<Sider className="sider">
					<Menu
						mode="inline"
						defaultSelectedKeys={['dashboard']}
						style={{
							overflowY: 'auto',
							height: 'calc(100vh - 50px)'
						}}
					>
						<Menu.Item key="dashboard">
							<Link to="/">Dashboard</Link>
						</Menu.Item>
						<Menu.Item key="task">
							<Link to="/task">Task</Link>
						</Menu.Item>
					</Menu>
				</Sider>
			)
		}
	}

	componentWillMount() {
		const { session } = this.props
		const token = Cookies.get('__zaplin_session')
		if (token) {
			get('checkSession', { token: token }, (res: any) => {
				if (res.status === true) {
					session.auth = res.content
				}
			})
		}
	}

	render() {
		return (
			<>
				{this._renderHeader()}
				<Layout className="layout">
					{this._renderSider()}
					<Content>
						<RouterManager />
					</Content>
				</Layout>
			</>			
		)
	}
}

export default App;
