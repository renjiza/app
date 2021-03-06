import React, { PureComponent } from 'react';

import { ucwords } from './xhr';

export const routeheader = [
    { id: 0, path: '/', label: 'Dashboard', icon: 'fas fa-tachometer-alt-fast' },
    { id: 1, label: 'Persiapan Awal' },
    { id: 2, label: 'Transaksi' },
    { id: 3, label: 'Laporan' }
]

export const routelist = [
    { parent: 1, path: '/branch/view', label: 'Cabang', icon: 'fas fa-building' },
    { parent: 1, path: '/user/view', label: 'User', icon: 'fas fa-user' }
]  

const LoadingIndicator = () => (
    <div className="container">Loading..</div>
)

const PageNotFound = () => (
    <div className="errorpage">        
        <div className="splitter">
            <div className="image"></div>
            <div className="text">
                <b>404</b>
                <label>Halaman tidak ditemukan</label>
            </div>       
        </div>
    </div>
)

export default class Async extends PureComponent<any, any> {

    constructor (props: any) {
        super(props)
        this.state = {
            Module: null
        }
    }    

    async componentWillMount() {
        const { param } = this.props
        const { params, url } = param.match
        switch (true) {
            case (url === '/'):
                await import(`../templates/dashboard/dashboard`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;      
            case (typeof params.type === 'undefined'):
                await import(`../templates/${params.module}/${params.module}`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            case (params.type === "view"):
                await import(`../templates/${params.module}/${params.module}View`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            case (params.type === "add" || params.type === "edit"):
                await import(`../templates/${params.module}/${params.module}Input`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
            break;
            default:
                await import(`../templates/${params.module}/${params.module}${ucwords(params.type)}`)
                    .then(Module => this.setState({ Module: Module.default }))
                    .catch((e) => { console.log(e); this.setState({ Module: PageNotFound }) })
        }
    }

    public render () {
        const { Module } = this.state;
        return (
            <>
                {Module 
                ? <Module /> 
                : <LoadingIndicator />}
            </>
        )
    }
}