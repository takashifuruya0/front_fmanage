<template>
  <div class="sub-busines">
    <!-- <my-nav-bar/> -->
    <h2>
      <img alt="Menta logo" src="@/assets/menta.png" width=50>
      Sub Business
    </h2>
    
    <opportunity-list msg="Opportunity List"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import OpportunityList from '@/components/OpportunityList.vue';
import MyNavBar from '@/components/MyNavBar.vue';
import component from '*.vue';

@Options({
  components: {
    HelloWorld,
    OpportunityList,
    MyNavBar
  },
})
export default class SubBusiness extends Vue{
  
}
</script>