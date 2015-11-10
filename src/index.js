import actions from './actions'
import stores from './stores'
import getters from './getters'

export function register(reactor) {

  reactor.registerStores(stores)

  return {
    actions: actions,
    getters: getters
  }
}


