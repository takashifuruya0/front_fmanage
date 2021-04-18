<template>
  <div class="home">
    <!-- <img alt="Menta logo" src="@/assets/menta.png"> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <iframe 
      v-if="this.$store.state.isAuthenticated == true"
      width="600" height="450" 
      src="https://datastudio.google.com/embed/reporting/c5957cf8-0c3c-47a5-9b16-f1ac4eef391d/page/Qu92B" frameborder="0" style="border:0" allowfullscreen></iframe>
    <hr>
    <opportunity-work-list msg="OpportunityWork List"/>
    <hr>
    <!-- <HelloWorld msg="Again"/> -->
    <!-- <OpportunityList msg="OpportunityList"/> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import OpportunityList from '@/components/OpportunityList.vue'
import OpportunityWorkList from '@/components/OpportunityWorkList.vue';
import component from '*.vue';

@Options({
  components: {
    HelloWorld,
    OpportunityList,
    OpportunityWorkList
  },
})
// @Component({})
export default class Home extends Vue {
}
</script>
