import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import invariant from 'invariant'

import {
  MODEL_CACHE_LOAD_ENTITY,
  MODEL_CACHE_REMOVE_ENTITY
} from './action-types'

export default {

  /**
   * Action to load data to model cache.
   *
   * @public
   * @param {object} model
   * @param {object} data - raw data
   * @return {object}
   */
  load(model, data) {

    invariant(
      isObject(model) && !isArray(model),
      'ModelCache.actions.load(): expected model to be instance of Model; got %s',
      typeof(model)
    )

    invariant(
      isObject(data) || isArray(data),
      'ModelCache.actions.load(): expected data to be an object; got %s',
      typeof(data)
    )

    if(!isArray(data)) {
      data = [data]
    }

    return {
      type: MODEL_CACHE_LOAD_ENTITY,
      payload: {
        model: model,
        data: data
      }
    }
  },

  /**
   * Action to remove data from model cache.
   *
   * @public
   * @param {object} model
   * @param {object} data
   * @return {object}
   */
  remove(model, data) {
    invariant(
      isObject(model) && !isArray(model),
      'ModelCache.actions.load(): expected model to be instance of Model; got %s',
      typeof(model)
    )

    invariant(
      'string' === typeof data.id,
      'ModelCache.actions.remove(): expected data.id to be a %s, got %s.',
      'string',
      typeof data.id
    )

    return {
      type: MODEL_CACHE_REMOVE_ENTITY,
      payload: {
        model: model,
        data: data
      }
    }
  }

}


