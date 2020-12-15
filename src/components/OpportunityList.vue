<template>
  <div class="opportunity-list">
    <h3>{{msg}}</h3>
        <!-- <b-button variant="primary">bootstrap</b-button> -->

    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="opp in opportunities"
          :key="opp.id"
        >
          <td>{{opp.id}}</td>
          <td>{{opp.name}}</td>
          <td>{{opp.status}}</td>
          <td>{{opp.val | numberFormat}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts">
import { Options, Vue} from 'vue-class-component';
// import Vue, { PropType } from "vue";
// import Component from 'vue-property-decorator';

@Options({
  props: {
    msg: String
  },
  components:{
  }
})

export default class OpportunityList extends Vue {
  msg?: string
  opportunities = []
  
  mounted () {
    this.axios({
      method: "get",
      // url: "https://www.machinemart.store/api/item/",
      url: "http://127.0.0.1:8000/drm/lancers/opportunity/?limit=30",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.opportunities = response.data.results;
    })
    .catch(e => {
      window.alert(e);
    })
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>