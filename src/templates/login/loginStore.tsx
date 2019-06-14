import { observable, action } from 'mobx';
import { createBrowserHistory } from 'history';

class Store {
    history = createBrowserHistory()
    @observable push(location: string) {
        this.history.push(location);
    }

    @observable showPassword = false
    @observable input: any = {
        email: 'renji.izaki@gmail.com',
        password: '123'
    }

    @action handleInput = (e: any) => {
        this.input[e.target.id] = e.target.value
    }

    @action toggleShow = () => {
        this.showPassword = !this.showPassword
    }
}

const store = new Store()

export default store