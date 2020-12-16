<template>
  <div class="sub-busines">
    <!-- <my-nav-bar/> -->
    <h1>
      <img alt="Menta logo" src="@/assets/menta.png" width=100>
      Sub Business
    </h1>
    
    <opportunity-list />
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