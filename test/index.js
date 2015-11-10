import { Reactor } from 'nuclear-js'
import { assert } from 'chai'

let reactor = new Reactor()

import { register } from '../src/'

let { actions, getters } = register(reactor)

function dispatch(action) {
  reactor.dispatch(action.type, action.payload)
}

describe('MayorModelCache', () => {
  afterEach(() => {
    reactor.reset()
  })

  describe('actions', () => {
    describe('#load', () => {
      it('should throw when a model is not an object', () => {
        let notAllowedModelTypes = [
          'foo', 1, [], null, undefined, '', true, false
        ]

        notAllowedModelTypes.forEach(model => {
          assert.throws(() => {
            actions.load(model)
          }, /expected model to be instance of Model/)
        })
      })

      it('should throw when it is called without data being an object', () => {
        let notAllowedDataTypes = [
          'foo', 1, null, undefined, true, false, ''
        ]

        notAllowedDataTypes.forEach(data => {
          assert.throws(() => {
            actions.load({}, data)
          })
        }, /expected data to be an object/)
      })

      it("should load given result to given model's cache", () => {
        let model = {
          entity: 'user',
        }
        let rawUser = {
          id: '1',
          firstName: 'John',
          lastName: 'Doe'
        }

        let _action = actions.load(model, rawUser)

        dispatch(actions.load(model, rawUser))

        let user = reactor.evaluate(getters.byId('user', '1'))

        assert(user.get('firstName') === 'John')
      })

      it("should load array of results", () => {
        let model = {
          entity: 'user',
        }
        let rawUsers = [{
          id: '1',
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe'
        }]

        dispatch(actions.load(model, rawUsers))

        let john = reactor.evaluate(getters.byId('user', '1'))
        let jane = reactor.evaluate(getters.byId('user', '2'))

        assert(john.get('firstName') === 'John')
        assert(jane.get('firstName') === 'Jane')
      })
    })
    describe('#remove', () => {
      it('removes', () => {
        let model = {
          entity: 'user',
        }
        let rawUsers = [{
          id: '1',
          firstName: 'John',
          lastName: 'Doe'
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe'
        }]

        dispatch(actions.load(model, rawUsers))

        let john = reactor.evaluate(getters.byId('user', '1'))
        let jane = reactor.evaluate(getters.byId('user', '2'))

        dispatch(actions.remove(model, { id: '1' }))

        let _john = reactor.evaluate(getters.byId('user', '1'))

        assert.notOk(_john)
      })

      it('should throw when data doesnt have id', () => {
        let model = { entity: 'user' }

        assert.throws(() => {
          actions.remove(model, {})
        }, /expected data.id to be a string/)
      })
    })
  })
})


