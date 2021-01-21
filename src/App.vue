<template>
  <alert-badge 
    :msg="msg" type="success" 
    v-bind:msgs="{error:'Error'}"/>
  <div id="nav">  
    <img alt="Menta logo" src="@/assets/menta.png" width=50>  | 
    <router-link to="/">Home</router-link> |
    <!-- <router-link to="/about">About</router-link> | -->
    <router-link :to="{name:'SubBusiness'}">SubBusiness</router-link> |
    <router-link 
      v-if="this.$store.state.isAuthenticated == false"
      :to="{name:'Login'}">Login
    </router-link>
    <span 
      v-if="this.$store.state.isAuthenticated == false"
      class="badge badge-secondary">
      {{this.$store.state.msg}}
    </span>
    <span 
      v-else
      class="badge badge-success">
      Logged in as {{this.$store.state.authUser.username}}
    </span> 
    <span
      v-if="this.$store.state.isAuthenticated == true"
      class="badge badge-info badge-pill"
      v-on:click="refresh()"
    >
      refresh 
    </span> 
    <span
      v-if="this.$store.state.isAuthenticated == true"
      class="badge badge-secondary badge-pill"
      v-on:click="logout()"
    >
      Log-out 
    </span> 
  </div>
  <router-view/>
</template>

<script>
import AlertBadge from '@/components/Alert.vue'
import axios from 'axios'

export default {
  components: {
    AlertBadge, 
  },
  methods: {
    refresh () {
      const payload = {
        refresh: this.$store.state.refresh,
      }
      axios.post(
        "https://www.fk-management.com/auth/jwt/refresh/",
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
          url: "https://www.fk-management.com/auth/user-detail/",
          method: "get",
          params: {}
        })
        .then((response) => {
          this.$store.commit("setAuthUser",
            {authUser: response.data, isAuthenticated: true}
          )
          // this.$router.push({name: 'Home'})
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
      if (window.confirm("ログアウトしますか？")){
        this.$store.commit("setAuthUser",
          {authUser: {}, isAuthenticated: false}
        )
        this.$store.commit("removeToken")
        this.$store.commit("removeRefresh")
        this.$store.commit("setMessageSuccess", `Logged out successfully!`)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
