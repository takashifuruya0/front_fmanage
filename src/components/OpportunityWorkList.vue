<template>
  <div>
    <h3>{{msg}}</h3>
    <table class="table table-responsive-sm">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Start</th>
          <th>End</th>
          <th>WorkingTime (min)</th>
          <th>Name</th>
          <th>Memo</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="ow in opportunityworks"
          :key="ow.id"
        >
          <td>{{ow.id}}</td>
          <td>{{convert_datetime_format(ow.datetime_start)}}</td>
          <td>{{convert_datetime_format(ow.datetime_end)}}</td>
          <td>{{ow.working_time}}</td>
          <td>{{ow.opportunity_name}}</td>
          <td><pre>{{ow.memo}}</pre></td>
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
  opportunityworks = []
  status_list = ["相談中", "提案中", "選定/作業中", "選定/終了", "キャンセル", "落選"]
  
  mounted () {
    if ("offset" in this.$route.query) {
      this.offset = Number(this.$route.query.offset);
    } else {
      this.offset = 0;
    }
    this.current = new URL(
      `${this.base_url}/drm/lancers/opportunitywork/?limit=20&offset=${this.offset}`
    )
    this.move(this.current)
    // this.status = this['$store'].getters.getListFilter.status
    // this.order_by = this['$store'].getters.getListFilter.order_by
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
      this.opportunityworks = response.data.results;
      this.count = response.data.count;
    })
    .catch(e => {
      window.alert(e);
    })
  }

  convert_datetime_format(val:string){
    // 2021-04-18T15:15:00+09:00	
    return val.substr(0, 10) + " " + val.substr(11, 5)
  }
}

</script>