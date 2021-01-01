<template>
  <div class="opportunity-list">
    <h3>{{msg}}</h3>
    <p>(status, count) = ({{get_status()}}, {{count}})</p>
    <a class="btn btn-sm btn-success" v-on:click="move(previous)" v-if="previous!=null">Previous</a>
    <a class="btn btn-sm btn-primary" :href="current">API</a>
    <a class="btn btn-sm btn-success" v-on:click="move(next)" v-if="next!=null">Next</a>
    <!-- <a class="btn btn-info" href="/#/sub-business?offset=20">test</a> -->
    <hr>
    <span class="badge bg-secondary" v-on:click="filter_status()">ALL</span>
    <span 
      v-for="status in status_list" :key="status"
      :class="label_status(status)"
      v-on:click="filter_status(status)"
      >
      {{status}}
    </span>
    <table class="table table-responsive-sm">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Date Open</th>
          <th>Name</th>
          <th>Status</th>
          <!-- <th>Type</th> -->
          <!-- <th>Category</th> -->
          <!-- <th>Client</th> -->
          <th>Value</th>
          <!-- <th>Add</th> -->
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
              tag="button" class="btn btn-sm btn-primary">
              {{opp.id}}
            </router-link>
          </td>
          <td>{{opp.date_open}}</td>
          <td>{{opp.name}}</td>
          <td>
            <label :class="label_status(opp.status)">
            {{opp.status}}
            </label>
          </td>
          <!-- <td>{{opp.type}}</td> -->
          <!-- <td>{{opp.category_name}}</td> -->
          <!-- <td>{{opp.client_name}}</td> -->
          <td>{{numberFormat(opp.val)}}</td>
          <!-- <td>
            <add-opportunity-work :id=opp.id />
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import AddOpportunityWork from '@/components/AddOpportunityWork.vue'
// import AlertBadge from '@/components/Alert.vue'
// import Vue, { PropType } from "vue";
// import Component from 'vue-property-decorator';

@Options({
  props: {
    msg: String,
  },
  components:{
    AddOpportunityWork,
    // AlertBadge,
  }
})

export default class OpportunityList extends Vue {
  msg?: string;
  next?: URL;
  current?: URL;
  previous?: URL;
  offset?: number
  status?: string;
  count?: number;

  base_url = "https://www.fk-management.com"
  opportunities = []
  status_list = ["相談中", "提案中", "選定/作業中", "選定/終了", "キャンセル", "落選"]
  
  mounted () {
    if ("offset" in this.$route.query) {
      this.offset = Number(this.$route.query.offset);
    } else {
      this.offset = 0;
    }
    this.current = new URL(
      `${this.base_url}/drm/lancers/opportunity/?limit=20&offset=${this.offset}`
    )
    this.move(this.current)  
  }

  numberFormat = (value: number)  => {
    return `¥${value.toLocaleString()}`;
  }

  show_next () {
    window.alert(this.next)
  }

  filter_status (status?: string) {
    this.status = status;
    if (this.current != null ){
      this.current.searchParams.delete("offset")
      this.current.searchParams.delete("status")      
      if (status != null){
        this.current.searchParams.append("status", status)
      }
      this.move(this.current)
    } else {
      window.alert("status error")
    }
  }

  move (url: URL) {
    this.axios({
      method: "get",
      url: String(url),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.current = url;
      if (response.data.next == null){
        this.next = response.data.next;
      } else {
        this.next = new URL(response.data.next);
      }
      if (response.data.previous == null) {
        this.previous = response.data.previous;  
      } else {
        this.previous = new URL(response.data.previous);
      }
      this.opportunities = response.data.results;
      this.count = response.data.count;
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
      color = "danger"
    } else {
      color = "info"
    }
    return `badge badge-${color}`
  }

  get_status() {
    if (this.status != null) {
      return this.status
    } else {
      return "ALL"
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>