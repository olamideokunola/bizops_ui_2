import axios from '../store/axios'

export default {
  loadUsers ({ state, commit }) {
    return axios({ method: 'get', url: '/users/' })
      .then(function (response) {
        // alert('In loadUsers, number if users is: ' + response.data.users.length)
        commit('SET_USERS', response.data.users)
      })
      .catch(err => alert(err))
  },
  login ({ commit, dispatch }, credentials) {
    return axios.post('/login/', credentials)
      .then(({ data }) => {
        // alert('In login!' + data.username)
        // console.log('------user data is: ', data)
        commit('SET_USER_DATA', data)
        // dispatch('loadUsers')
      })
  },
  saveNewUser ({ dispatch, commit }, newUser) {
    return axios.post('/users/', newUser)
      .then(response => {
        commit('SET_SAVED_USER', response.data.user)
        // alert('In saveNewsuser username is ' + response.data.user.username)
        dispatch('loadUsers')
      })
  },
  saveExistingUser ({ dispatch, commit }, username, newUser) {
    return axios.put('/users/' + username, newUser)
      .then(response => {
        commit('SET_SAVED_USER', response.data.user)
        // alert('In saveNewsuser Existing username is ' + response.data.user.username)
        dispatch('loadUsers')
      })
  },
  setAuthorizationToken (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${
        token
    }`
  }
}
