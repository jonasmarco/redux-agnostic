const { createStore, combineReducers, compose, applyMiddleware } = Redux

// IMPORT THE MIDDLEWARE
import thunk from '../middleware/thunk.js'
import localStorage from '../middleware/localStorage.js'

// IMPORT THE REDUCERS
import token from '../reducers/token.js'
import user from '../reducers/user.js'

// DEFINE MIDDLEWARE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage))

// DEFINE REDUCERS
const reducer = combineReducers({ token, user })

// CREATE THE REDUX STORE
const store = createStore(reducer, enhancer)

export default store
