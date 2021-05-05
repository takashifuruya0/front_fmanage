<template>
  <div class="home">
    <!-- <div class="dataportal" v-if="this.$store.state.isAuthenticated == true">
      <iframe 
        width="600" height="450" 
        src="https://datastudio.google.com/embed/reporting/c5957cf8-0c3c-47a5-9b16-f1ac4eef391d/page/Qu92B" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
    <hr> -->
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

<style>
.dataportal{
	position:relative;
	width:100%;
	height:0;
	padding-top:75%;
}
.dataportal iframe{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
}
</style>