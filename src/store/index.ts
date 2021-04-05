import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh'),
    list_filter: {
      status: null,
      order_by: null,
    },
    msgs_success: null,
    msgs_info: null,
    msgs_warning: null,
    msgs_error: null,
  },
  mutations: {
    setAuthUser(state, {authUser, isAuthenticated}) {
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
    updateRefresh(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem('refresh', newToken);
      state.refresh = newToken;
    },
    removeRefresh(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem('refresh');
      state.refresh = null;
    },
    setMessageSuccess(state, msg){
      state.msgs_success = msg
      scrollTo(0, 0)
    },
    setMessageInfo(state, msg){
      state.msgs_info = msg
      scrollTo(0, 0)
    },
    setMessageWarning(state, msg){
      state.msgs_warning = msg
      scrollTo(0, 0)
    },
    setMessageError(state, msg){
      state.msgs_error = msg
      scrollTo(0, 0)
    },
    setListFilter(state, lf) {
      state.list_filter = lf
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getListFilter(state) {
      return state.list_filter
    }
  },
  plugins: [
    createPersistedState(),
  ]
})
