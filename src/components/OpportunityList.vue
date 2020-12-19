<template>
  <div class="opportunity-list">
    <h3>{{msg}}</h3>
        <!-- <b-button variant="primary">bootstrap</b-button> -->
    <a class="btn btn-success" v-on:click="move(previous)" v-if="previous!=null">Previous</a>
    <a class="btn btn-primary" :href="current">API</a>
    <a class="btn btn-success" v-on:click="move(next)" v-if="next!=null">Next</a>
    <!-- <a class="btn btn-info" href="/#/sub-business?offset=20">test</a> -->
    <table class="table table-responsive-sm">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Type</th>
          <th>Category</th>
          <th>Client</th>
          <th>Date</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="opp in opportunities"
          :key="opp.id"
        >
          <td>
            <router-link 
              :to="{name:'SubBusinessDetail', params:{id:opp.id}}"
              tag="button" class="btn btn-primary">
              {{opp.id}}
            </router-link>
          </td>
          <td>{{opp.name}}</td>
          <td>
            <label :class="label_status(opp.status)">
            {{opp.status}}
            </label>
          </td>
          <td>{{opp.type}}</td>
          <td>{{opp.category}}</td>
          <td>{{opp.client}}</td>
          <td>{{opp.date_open}}</td>
          <td>{{numberFormat(opp.val)}}</td>
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
    msg: String,
  },
  components:{
  }
})

export default class OpportunityList extends Vue {
  msg?: string;
  next?: URL;
  current?: URL;
  previous?: URL;
  offset?: number

  base_url = "https://www.fk-management.com"
  opportunities = []
  
  mounted () {
    if ("offset" in this.$route.query) {
      this.offset = Number(this.$route.query.offset);
    } else {
      this.offset = 0;
    }
    this.current = new URL(`${this.base_url}/drm/lancers/opportunity/?limit=20&offset=${this.offset}`)
    this.move(this.current)  
  }

  numberFormat = (value: number)  => {
    return `¥${value.toLocaleString()}`;
  }

  show_next () {
    window.alert(this.next)
  }

  move (url: URL) {
    // window.alert(url)
    this.axios({
      method: "get",
      url: String(url),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.current = url;
      this.next = response.data.next;
      this.previous = response.data.previous;
      this.opportunities = response.data.results;
    })
    .catch(e => {
      window.alert(e);
    })
  }

  label_status(status: string){
    let color;
    if (status == "選定/終了"){
      color = "success"
    } else if (status == "選定/作業中"){
      color = "primary"
    } else if (status == "キャンセル"){
      color = "warning"
    } else if (status == "落選"){
      color = "secondary"
    } else {
      color = "info"
    }
    return `badge bg-${color}`
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>