import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './ducks'

const createStoreWithThunk = applyMiddleware(thunk)(createStore)

// TODO: figure out how to apply multiple middlewares for routingMiddleware

const store = createStoreWithThunk(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
)

export default store
