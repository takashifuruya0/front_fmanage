<template>
  <alert-badge 
    :msg="msg" type="success" 
    v-bind:msgs="{error:'Error'}"/>
  <div id="nav">  
    <img alt="Menta logo" src="@/assets/menta.png" width=50>  | 
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{name:'SubBusiness'}">SubBusiness</router-link> |
    <router-link :to="{name:'Login'}">Login</router-link> |
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
  </div>
  <router-view/>
</template>

<script>
import AlertBadge from '@/components/Alert.vue'

export default {
  components: {
    AlertBadge, 
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
