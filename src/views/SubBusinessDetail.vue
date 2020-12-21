<template>
  <div class="sub-busines-detail">
    <opportunity-detail msg="Opportunity Detail"/>
    <router-link :to="{name:'SubBusiness'}" tag="button" class="btn btn-info">Back</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import OpportunityDetail from '@/components/OpportunityDetail.vue';
import MyNavBar from '@/components/MyNavBar.vue';
import component from '*.vue';

@Options({
  components: {
    HelloWorld,
    OpportunityDetail,
    MyNavBar
  },
})
export default class SubBusinessDetail extends Vue{
  
}
</script>