import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    msgs_success: null,
    msgs_info: null,
    msgs_warning: null,
    msgs_error: null,
  },
  mutations: {
    setAuthUser(state, {
      authUser,
      isAuthenticated
    }) {
      state.authUser = authUser;
      state.isAuthenticated = isAuthenticated;
    },
    updateToken(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('token');
      state.jwt = null;
    },
    setMessageSuccess(state, msg){
      state.msgs_success = msg
    },
    setMessageInfo(state, msg){
      state.msgs_info = msg
    },
    setMessageWarning(state, msg){
      state.msgs_warning = msg
    },
    setMessageError(state, msg){
      state.msgs_error = msg
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState(),
  ]
})
