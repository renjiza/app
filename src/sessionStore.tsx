import { observable } from 'mobx';


class Store {
    @observable auth = {
        isLogged: false
    }
}

const store = new Store()

export default store