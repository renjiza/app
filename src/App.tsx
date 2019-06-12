import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Layout, Menu, Icon } from 'antd';

import './App.less';
import RouterManager from './components/routermanager';

import auth from './authStore';

const stores = { auth }
const { SubMenu } = Menu
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
	return (
		<Provider {...stores}>
			<Router>
				<Header className="header">Header</Header>
				<Layout>
					<Sider width={200} style={{ background: '#fff' }}>
						<Menu
							mode="inline"
							defaultSelectedKeys={['dashboard']}
							style={{ 
								overflowY: 'auto',
								height: 'calc(100vh - 50px)' 
							}}
						>
							<Menu.Item key="dashboard">Dashboard</Menu.Item>
							<SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
								<Menu.Item key="sub1-1">option1</Menu.Item>
								<Menu.Item key="sub1-2">option2</Menu.Item>
								<Menu.Item key="sub1-3">option3</Menu.Item>
								<Menu.Item key="sub1-4">option4</Menu.Item>
							</SubMenu>				
						</Menu>
					</Sider>
					<Content className="content">
						<RouterManager />
					</Content>
				</Layout>
			</Router>
		</Provider>
	);
}

export default App;
