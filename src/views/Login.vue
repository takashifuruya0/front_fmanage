<template lang="html">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6">
        <form class="form">
          <h3>Login Form</h3>
          <div class="form-group">
            <label for="id_username">Username: </label>
            <input
              class="form-control"
              v-model="username"
              type="text"
              placeholder="Username"
              autofocus="autofocus"
              id="id_username">
          </div>
          <div class="form-group">
            <label for="id_password">Password: </label>
            <input
              class="form-control"
              v-model="password"
              type="password"
              placeholder="Password"
              id="id_password">
          </div>
          <button
            @click.prevent="logout"
            class="btn btn-secondary"
            type="submit">
            Log Out
          </button>
          <button
            @click.prevent="refresh"
            class="btn btn-info"
            type="submit">
            Refresh
          </button>
          <button
            @click.prevent="authenticate"
            class="btn btn-primary"
            type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    authenticate () {
      const payload = {
        username: this.username,
        password: this.password
      }
      axios.post(
        "https://meta.fk-management.com/auth/jwt/create/",
        payload
      )
      .then((response) => {
        this.$store.commit('updateToken', response.data.access)
        this.$store.commit('updateRefresh', response.data.refresh);
        // get and set auth user
        const base = {
          baseURL: "/",
          headers: {
          // Set your Authorization to 'JWT', not Bearer!!!
            Authorization: `JWT ${this.$store.state.jwt}`,
            'Content-Type': 'application/json'
          },
          xhrFields: {
              withCredentials: true
          }
        }
        // Even though the authentication returned a user object that can be
        // decoded, we fetch it again. This way we aren't super dependant on
        // JWT and can plug in something else.
        const axiosInstance = axios.create(base)
        axiosInstance({
          url: "https://meta.fk-management.com/auth/user-detail/",
          method: "get",
          params: {}
        })
        .then((response) => {
          this.$store.commit("setAuthUser",
            {authUser: response.data, isAuthenticated: true}
          )
          this.$router.push({name: 'Home'})
          this.$store.commit("setMessageSuccess", `Logged in successfully!`)
        })
      })
      .catch((error) => {
        this.$store.commit("setMessageWarning", `Failed to log in`)
      })
    },
    refresh () {
      const payload = {
        refresh: this.$store.state.refresh,
      }
      axios.post(
        "https://meta.fk-management.com/auth/jwt/refresh/",
        payload
      )
      .then((response) => {
        this.$store.commit('updateToken', response.data.access);
        // get and set auth user
        const base = {
          baseURL: "/",
          headers: {
            Authorization: `JWT ${this.$store.state.jwt}`,
            'Content-Type': 'application/json'
          },
          xhrFields: {
              withCredentials: true
          }
        }
        const axiosInstance = axios.create(base)
        axiosInstance({
          url: "https://meta.fk-management.com/auth/user-detail/",
          method: "get",
          params: {}
        })
        .then((response) => {
          this.$store.commit("setAuthUser",
            {authUser: response.data, isAuthenticated: true}
          )
          this.$router.push({name: 'Home'})
          this.$store.commit("setMessageSuccess", `Refreshed successfully!`)
        })
      })
      .catch((error) => {
        this.$store.commit("setMessageWarning", `Failed to Refresh`)
        this.$store.commit("setAuthUser",
          {authUser: {}, isAuthenticated: false}
        )
        this.$store.commit("removeToken")
        this.$store.commit("removeRefresh")
      })
    },
    logout () {
      this.$store.commit("setAuthUser",
        {authUser: {}, isAuthenticated: false}
      )
      this.$store.commit("removeToken")
      this.$store.commit("removeRefresh")
      this.$store.commit("setMessageSuccess", `Logged out successfully!`)
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style lang="css">
</style>