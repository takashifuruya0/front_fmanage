<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <hr>
    <!-- <HelloWorld msg="Again"/> -->
    <OpportunityList msg="OpportunityList"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import OpportunityList from '@/components/OpportunityList.vue'
import component from '*.vue';

@Options({
  components: {
    HelloWorld,
    OpportunityList,
  },
})
// @Component({})
export default class Home extends Vue {
}
</script>
