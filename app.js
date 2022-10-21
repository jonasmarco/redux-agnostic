import store from './redux/store/configureStore.js'

// IMPORT THE ACTIONS
import { tokenFetch } from './redux/reducers/token.js'
import { userFetch } from './redux/reducers/user.js'

// THE LOGIN FUNCTION
async function login(user) {
  let state = store.getState()
  if (state.token.data === null) {
    await store.dispatch(tokenFetch(user))
    state = store.getState()
  }
  await store.dispatch(userFetch(state.token.data))
}
login({ username: 'dog', password: 'dog' })
