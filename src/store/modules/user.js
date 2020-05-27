import jwtDecode from 'jwt-decode'

import UserService from '../../services/UserService'

export const state = {
  groups: [
    {
      id: 63,
      description: 'salesman_group',
      details: 'Group of salesmen',
      authorizations: []
    },
    {
      id: 64,
      description: 'manager_group',
      details: 'Group of managers',
      authorizations: []
    }
  ],
  savedUser: {},
  newUser: {
    id: null,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    authorizations: [],
    groups: []
  },
  blankUser: {
    id: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    authorizations: [],
    groups: []
  },
  users: [
  ],
  user: null
}

export const mutations = {
  SET_USER_DATA (state, userData) {
    const decoded = jwtDecode(userData.token)
    state.user = decoded.user
    localStorage.setItem('user', JSON.stringify(userData))
    UserService.setAuthorizationToken(userData.token)
  },
  CLEAR_USER_DATA (state) {
    // state.user = null
    localStorage.removeItem('user')
    // alert('In CLEAR_USER_DATA')
    // axios.defaults.headers.common.Authorization = null
    location.reload()
  },
  SET_USERS (state, users) {
    state.users = users
    // alert('In SET_USERS number if users is: ' + users.length)
  },
  SET_SAVED_USER (state, savedUser) {
    state.savedUser = savedUser
  }
}

export const actions = {
  loadUsers ({ state, commit }) {
    // if(state.user.isAuthenticated){ // && state.user.authorizations.sales.includes('create') ){
    // alert("In loadUsers, user is authenticated")
    return UserService.loadUsers({ state, commit })
  },
  login ({ commit, dispatch }, credentials) {
    return UserService.login({ commit, dispatch }, credentials)
  },
  logout ({ commit }) {
    commit('CLEAR_USER_DATA')
  },
  saveUser ({ state, dispatch, commit }) {
    if (state.newUser.id == null || state.newUser.id === '') {
      // Save New User
      return UserService.saveNewUser({ dispatch, commit }, state.newUser)
    } else {
      // Save Existing User
      return UserService.saveExistingUser({ dispatch, commit }, state.newUser.username, state.newUser)
    }
  }
}

export const getters = {
  loggedIn (state) {
    return !!state.user
  },
  loggedInUser (state, getters) {
    return getters.loggedIn ? state.user.username : null
  }
}
