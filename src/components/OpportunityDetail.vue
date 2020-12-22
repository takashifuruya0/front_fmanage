<template>
  <div class="container-fluid">
    <h3>{{msg}}</h3>
    <hr>
    <div class="row">
      <div class="col-12 col-sm-6">
        <h5 id="detail">Detail</h5>
        <table class="table table-responsive-xs">
          <tr>
            <th>Name</th>
            <td>{{opportunity.name}}</td>
          </tr>
          <tr>
            <th>Client</th>
            <td>{{opportunity.client_name}}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              {{opportunity.type}} / 
              <label :class="label_status(opportunity.status)">
              {{opportunity.status}}
              </label>
            </td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{{opportunity.category_name}}</td>
          </tr>
          <tr>
            <th>Val</th>
            <td>
              {{numberFormat(opportunity.val)}} / {{numberFormat(opportunity.val_payment)}}
            </td>
          </tr>
          <tr>
            <th>Datetime Start</th>
            <td>{{opportunity.date_open}}</td>
          </tr>
          <tr>
            <th>Datetime End</th>
            <td>{{opportunity.date_close}}</td>
          </tr>
          <tr>
            <th>Working Time</th>
            <td>
              {{sum_working_time}} h  
            </td>
          </tr>
          <tr>
            <th>OW List</th>
            <td>
              <button 
                class="btn btn-info btn-sm" @click="switch_ow_list()"
                v-if="is_hidden_ow_list"
              >
                Open <span class="badge badge-light badge-pill">{{opportunity_works.length}}</span>
              </button>
              <button 
                class="btn btn-secondary btn-sm" @click="switch_ow_list()"
                v-else
              >
                Hide <span class="badge badge-light badge-pill">{{opportunity_works.length}}</span>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <ul class="list-group" :hidden="is_hidden_ow_list">
                <li
                  class="list-group-item"
                  v-for="ow in opportunity_works.reverse()"
                  :key="ow.id"
                >
                  {{show_datetime(ow.datetime_start)}} ~ {{show_datetime(ow.datetime_end)}}
                  <span class="badge badge-primary badge-pill">{{ow.working_time/60}} h</span>
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
      <hr>
      <div class="col-12 col-sm-6">
        <add-opportunity-work :id=opportunity.id />
      </div>
      
      <div class="col-12">
        <hr>
        <h5>自動</h5>
        <table class="table table-responsive-sm">
          <!-- {{opportunity}} -->
          <tr 
            v-for="(val, key) in opportunity"
            :key="key"
          >
            <th>{{key}}</th>
            <td>{{val}}</td>
          </tr>
          <!-- <tr>
            <th>商談名</th>
            <td>{{opportunity.name}}</td>
          </tr>
          <tr>
            <th>金額</th>
            <td>{{numberFormat(opportunity.val)}}</td>
          </tr> -->
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';
import AddOpportunityWork from '@/components/AddOpportunityWork.vue'
// import Vue, { PropType } from "vue";
// import Component from 'vue-property-decorator';

@Options({
  props: {
    msg: String,
  },
  components:{
    AddOpportunityWork,
  }
})

export default class OpportunityDetail extends Vue {
  msg?: string;
  // opportunity: any;
  opportunity = {
    name: null,
    client_name: null,
    category_name: null,
    val: 0,
    val_payment: 0, 
    date_open: null,
    date_close: null,
    status: null,
    type: null,
    id: null,
  };
  base_url = "https://www.fk-management.com"
  sum_working_time: number = 0;
  is_hidden_ow_list: boolean = true;

  OppotunityWork!: {
    id: Number;
    datetime_start: Date;
    datetime_end: Date;
    working_time: Number;
  };
  opportunity_works = [];

  
  // mounted () {
  //   // window.alert("OK")
  //   this.get()
  // }

  numberFormat = (value: number)  => {
    return `¥${value.toLocaleString()}`;
  }
  
  mounted () {
    // window.alert(this.base_url)
    this.axios({
      method: "get",
      url: `${this.base_url}/drm/lancers/opportunity/${this.$route.params.id}/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.opportunity = response.data;
    })
    .catch(e => {
      window.alert(e);
    })
    // Opportunity Worki List
    let ow_list: any[] = [];
    const base = {
      baseURL: "/",
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const axiosInstance = this.axios.create(base)
    axiosInstance({
      method: "get",
      url: `${this.base_url}/drm/lancers/opportunitywork/?opportunity_id=${this.$route.params.id}`,
    })
    // this.axios({
    //   method: "get",
    //   url: `${this.base_url}/drm/lancers/opportunitywork/?opportunity_id=${this.$route.params.id}`,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    .then(response => {
      for (const ow in response.data.results) {
        this.sum_working_time += response.data.results[ow].working_time/60
      }
      this.opportunity_works = response.data.results
    })
    .catch(e => {
      window.alert(e.response.data)
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
    return `badge badge-${color}`
  }

  show_datetime(dt_str: string) {
    // 2020-12-19T13:30:00+09:00
    return `${dt_str.slice(0, 10)} ${dt_str.slice(11, 16)}`
  }

  switch_ow_list() {
    if (this.is_hidden_ow_list) {
      this.is_hidden_ow_list = false;
    } else {
      this.is_hidden_ow_list = true;
    }
  }
}
</script>

