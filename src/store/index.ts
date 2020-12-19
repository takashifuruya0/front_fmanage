import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem('token'),
    // endpoints: {
    //   // TODO: Remove hardcoding of dev endpoints
    //   obtainJWT: 'http://127.0.0.1:8000/auth/jwt/create/',
    //   refreshJWT: 'http://127.0.0.1:8000/auth/jwt/refresh/',
    //   baseUrl: '/'
    // },
    msg: null,
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
    setMessage(state, msg){
      state.msg = msg
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
