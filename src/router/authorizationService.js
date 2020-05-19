import store from '../store/index'

// const user = store.state.user

export const AuthorizationService = {
  checkAuth: (requiredAuthorization) => {
    // alert('user is: ' + store.state.user.username)
    // alert(Object.getOwnPropertyNames(requiredAuthorization))
    // alert('requiredAuthorization.model is: ' + requiredAuthorization)
    const auth = store.state.user.authorizations.find((auth) => auth.model === requiredAuthorization.model)
    // alert('number of authorizations is: ' + store.state.user.authorizations.length)
    // alert('auth is: ' + auth)
    if (auth) {
      const action = requiredAuthorization.action
      if (auth[action] === false) {
        return false
      } else {
        return true
      }
    } else {
      // alert(false)
      return false
    }
  }
}
