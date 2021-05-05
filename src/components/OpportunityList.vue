<template>
  <div class="opportunity-list">
    <h3>{{msg}}</h3>
    <p>(status, order_by, count) = ({{get_status()}}, {{order_by}}, {{count}})</p>
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
          <th v-on:click="set_order_by('-name')">Name</th>
          <th v-on:click="set_order_by('-status')">Status</th>
          <th v-on:click="set_order_by('-date_open')">Date Open</th>
          <th v-on:click="set_order_by('-date_close')">Date Close</th>
          <th>WorkingTime</th>
          <th v-on:click="set_order_by('-val')">Value</th>
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
          <td>
            {{opp.name}}
            <label class="badge badge-success" v-show="opp.client_name_slack">
              Slack: <span class="badge badge-light">{{opp.client_name_slack}}</span>
            </label>
          </td>
          <td>
            <label :class="label_status(opp.status)">
            {{opp.status}} <span class="badge badge-light badge-pill">{{opp.type}}</span>
            </label>
          </td>
          <td>
            {{opp.date_open}}
            <label 
              v-show="
                new Date() >= new Date(opp.date_open) 
                && (opp.status == '相談中' || opp.status == '提案中')
                && opp.date_open != null
                " 
              class="badge badge-warning">
              作業開始
            </label>
          </td>
          <td>
            {{opp.date_close}}
            <label 
              v-show="
                new Date() >= new Date(opp.date_close) 
                && opp.status == '選定/作業中'
                && opp.date_close != null
                " 
              class="badge badge-danger">
              納期超え
            </label>
          </td>
          <td>{{Math.round(opp.working_time/60*10)/10}} h</td>
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
  order_by?: string | null;

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
    this.status = this['$store'].getters.getListFilter.status
    this.order_by = this['$store'].getters.getListFilter.order_by
    this.filter_status(this.status)
  }

  numberFormat = (value: number)  => {
    return `¥${value.toLocaleString()}`;
  }

  show_next () {
    window.alert(this.next)
  }

  set_order_by(val: string) {
    if (this.order_by == val) {
      this.order_by = null
    } else {
      this.order_by = val
    }
    this.filter_status(this.status)
  }

  filter_status (status?: string) {
    this.status = status;
    this['$store'].commit("setListFilter", {
      status: this.status,
      order_by: this.order_by
    });
    if (this.current != null ){
      this.current.searchParams.delete("offset")
      this.current.searchParams.delete("status")      
      if (status != null){
        this.current.searchParams.append("status", status)
      }
      if (this.order_by != null){
        this.current.searchParams.append("order_by", this.order_by)
      } else {
        this.current.searchParams.delete("order_by")      
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

  is_over_deadline(date_close: string) {
    return new Date() > new Date(date_close)
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>