import { observable } from 'mobx';


class Store {
    @observable auth = {}
}

const store = new Store()

export default store