<template>
  <div>
    <h3>
      {{msg}}
    </h3>
    <h4 class="badge badge-success badge-sm">
        {{getStringFromDate(today)}}: 
        <span class="badge badge-light badge-pill">{{total}} min</span>
      </h4>
    <table class="table table-responsive-sm">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Start</th>
          <th>End</th>
          <th>WorkingTime (min)</th>
          <th>Name</th>
          <th>Memo</th>
          <th>Calendar</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="ow in opportunityworks"
          :key="ow.id"
        >
          <td>
            <a :href='base_url+"/admin/lancers/opportunitywork/"+ow.id' class="btn btn-sm btn-info">
              {{ow.id}}
            </a>
          </td>
          <td>{{convert_datetime_format(ow.datetime_start)}}</td>
          <td>{{convert_datetime_format(ow.datetime_end)}}</td>
          <td>{{ow.working_time}}</td>
          <td>
            <router-link 
              :to="{name:'SubBusinessDetail', params:{id:ow.opportunity}}"
            >
              {{ow.opportunity_name}}
            </router-link>
          </td>
          <td><pre>{{ow.memo}}</pre></td>
          <td>
            <span class="badge badge-success" v-if="ow.is_in_calendar">
              <fa icon="calendar-check" type="fas" class="calendar-check" width=15></fa>
            </span>
          </td>
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

export type opportunitywork = {
  id: number,
  opportunity_name: string,
  opportunity_type: string,
  opportunity_status: string,
  created_at: string,
  last_updated_at: string,
  is_active: boolean,
  sync_id: number|null,
  datetime_start: string|null,
  datetime_end: string|null,
  working_time: number,
  is_in_calendar: boolean,
  memo: string,
  created_by: number,
  last_updated_by: number,
  opportunity: number,
}

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
  total: number = 0;
  opportunityworks: opportunitywork[] = []
  base_url: string = "https://www.fk-management.com"
  status_list: string[] = ["相談中", "提案中", "選定/作業中", "選定/終了", "キャンセル", "落選"]
  today: Date = new Date()
  
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
      // total
      let today_str = this.getStringFromDate(this.today)
      for (let ow of this.opportunityworks){
        if (ow.datetime_start && ow.datetime_start.slice(0,10) == today_str){
          this.total +=  ow.working_time
        }
      }
    })
    .catch(e => {
      window.alert(e);
    })
  }

  convert_datetime_format(val:string){
    // 2021-04-18T15:15:00+09:00	
    return val.substr(0, 10) + " " + val.substr(11, 5)
  }
  
  getStringFromDate(date: Date) {
    var year_str = String(date.getFullYear())
    var month_str = String(1 + date.getMonth());
    var day_str = String(date.getDate());
    var format_str = 'YYYY-MM-DD';
    month_str = ('0' + month_str).slice(-2);
    day_str = ('0' + day_str).slice(-2);
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    return format_str;
  };

}

</script>