import actions from '../action-types'
import { toImmutable, Store } from 'nuclear-js'

export const STORE_NAME = '@@mayor/model-cache'

/**
 * ModelCacheStore is used for storing arbitrary model objects.
 */
export default Store({
  getInitialState() {
    return toImmutable({})
  },

  initialize() {
    this.on(actions.MODEL_CACHE_LOAD_ENTITY, load)
    this.on(actions.MODEL_CACHE_REMOVE_ENTITY, remove)
  }
})

/**
 * Loads data into cache using given model.
 *
 * @public
 * @param {Immutable.Map} cache - store state
 * @param {object} payload
 * @return {Immutable.Map}
 */
function load(cache, payload) {
  let { model, data } = payload

  cache = ensureEntityContainer(cache, model.entity)

  return cache.withMutations(cache => {
    data.forEach(entry => {
      cache.setIn([model.entity, entry.id], toImmutable(entry))
    })
  })

}

/**
 * Removes data from cache with given id
 *
 * @public
 * @param {Immutable.Map} cache - store state
 * @param {object} payload
 * @return {Immutable.Map}
 */
function remove(cache, payload) {
  let { model, data } = payload

  cache = ensureEntityContainer(cache, model.entity)

  return cache.removeIn([model.entity, payload.data.id])
}

/**
 * Ensures cache has a container map for given entity.
 *
 * @public
 * @param {Immutable.Map} cache - store state
 * @param {string} entity - model entity
 * @return {Immutable.Map}
 */
function ensureEntityContainer(cache, entity) {
  if(!cache.has(entity)) {
    cache = cache.set(entity, toImmutable({}))
  }

  return cache
}
