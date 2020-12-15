<template>
  <div class="sub-busines">
    <h1>Sub Business</h1>
    <img alt="Menta logo" src="@/assets/menta.png">
    <opportunity-list />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import OpportunityList from '@/components/OpportunityList.vue'
import component from '*.vue';

@Options({
  components: {
    HelloWorld,
    OpportunityList,
  },
})
export default class SubBusiness extends Vue{
  
}
</script>