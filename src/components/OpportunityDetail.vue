<template>
  <div class="container-fluid">
    <h3>
      {{msg}}
    </h3>
    <hr>
    <div class="row">
      <div class="col-12 col-sm-6">
        <h5 id="detail">Detail</h5>
        <table class="table table-responsive-xs">
          <tr>
            <th>Name</th>
            <td>
              <a :href="'/admin/lancers/opportunity/'+opportunity.id">
                {{opportunity.name}}
              </a>
            </td>
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
              <label 
                v-if="opportunity.is_regular"
                class="badge badge-dark badge-pill">
                定期案件
              </label>
              

              <button
                v-show="opportunity.status=='選定/作業中'"
                class="btn btn-sm btn-block btn-success"
                v-on:click="change_status('選定/終了')">
                <fa icon="check-circle" type="fas" class="classname" width=15></fa> 終了
              </button>
              <button
                v-show="opportunity.status=='提案中'"
                class="btn btn-sm btn-block btn-secondary"
                v-on:click="change_status('落選')">
                <fa icon="check-circle" type="fas" class="classname" width=15></fa> 落選
              </button>
              <button
                v-show="opportunity.status=='相談中'"
                class="btn btn-sm btn-block btn-secondary"
                v-on:click="change_status('キャンセル')">
                <fa icon="check-circle" type="fas" class="classname" width=15></fa> キャンセル
              </button>
              <button
                v-show="opportunity.status=='提案中' || opportunity.status=='相談中'"
                class="btn btn-sm btn-block btn-primary"
                v-on:click="change_status('選定/作業中')">
                <fa icon="check-circle" type="fas" class="classname" width=15></fa> 選定
              </button>
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
            <th>Datet Open</th>
            <td>
              {{opportunity.date_open}}
              <label 
                v-show="
                  new Date() >= new Date(opportunity.date_open) 
                  && (opportunity.status == '相談中' || opportunity.status == '提案中')
                  && opportunity.date_open != null
                  " 
                class="badge badge-warning">
                作業開始
              </label>
            </td>
          </tr>
          <tr>
            <th>Date Close</th>
            <td>
              {{opportunity.date_close}}
              <label 
                v-show="
                  new Date() > new Date(opportunity.date_close) 
                  && opportunity.status == '選定/作業中'
                  && opportunity.date_close != null
                  " 
                class="badge badge-danger">
                納期超え
              </label>
            </td>
          </tr>
          <tr>
            <th>Date Payment</th>
            <td>{{opportunity.date_payment}}</td>
          </tr>
          <tr>
            <th>Working Time</th>
            <td v-if="sum_working_time==0">
              - h  
            </td>
            <td v-else>
              {{sum_working_time}} h  
            </td>
          </tr>
          <tr>
            <th>OW List</th>
            <td>
              <button 
                class="btn btn-info btn-sm btn-block" @click="switch_ow_list()"
                v-if="is_hidden_ow_list"
              >
                <fa icon="sync-alt" type="fas" class="classname" width=15></fa> Reload
              </button>
              <button 
                class="btn btn-secondary btn-sm btn-block" @click="switch_ow_list()"
                v-else
              >
                <fa icon="minus-circle" type="fas" class="classname" width=15></fa> Hide 
                <span class="badge badge-light badge-pill">{{opportunity_works.length}}</span>
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <ul class="list-group" :hidden="is_hidden_ow_list">
                <li
                  class="list-group-item"
                  v-for="ow in opportunity_works"
                  :key="ow.id"
                >
                  {{show_datetime(ow.datetime_start)}} ~ {{show_datetime(ow.datetime_end)}}
                  <span class="badge badge-primary badge-pill">
                    <fa icon="clock" type="fas" class="classname" width=10></fa> {{ow.working_time}} min
                  </span>
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
          <tr 
            v-for="(val, key) in opportunity"
            :key="key"
          >
            <th>{{key}}</th>
            <td>{{val}}</td>
          </tr>
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
    date_payment: null,
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

  
  numberFormat = (value: number)  => {
    return `¥${value.toLocaleString()}`;
  }
  $store: any;
  
  mounted () {
    // window.alert(this.base_url)
    scrollTo(0, 0)
    this.axios({
      method: "get",
      url: `${this.base_url}/drm/lancers/opportunity/${this.$route.params.id}/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.opportunity = response.data;
      this.switch_ow_list()
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

  show_datetime(dt_str: string|null) {
    // 2020-12-19T13:30:00+09:00
    if (dt_str == null) {
      return "-"
    } else {
      return `${dt_str.slice(0, 10)} ${dt_str.slice(11, 16)}`
    }
    
  }

  switch_ow_list() {
    if (this.is_hidden_ow_list) {
      this.load_ow_list()
      this.is_hidden_ow_list = false;

    } else {
      this.is_hidden_ow_list = true;
    }
  }

  load_ow_list() {
    // Opportunity Worki List
    let ow_list: any[] = [];
    this.sum_working_time = 0;
    this.axios({
      method: "get",
      url: `${this.base_url}/drm/lancers/opportunitywork/?opportunity_id=${this.$route.params.id}&limit=1000`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      for (const ow in response.data.results) {
        this.sum_working_time += response.data.results[ow].working_time
      }
      this.sum_working_time = this.sum_working_time/60
      this.opportunity_works = response.data.results
    })
    .catch(e => {
      window.alert(e.response.data)
    })
  }

  load_opportunity () {
    this.axios({
      method: "get",
      url: `${this.base_url}/drm/lancers/opportunity/${this.$route.params.id}/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.opportunity = response.data;
      this.switch_ow_list()
    })
    .catch(e => {
      window.alert(e);
    })
  }

  change_status(status) {
    if (window.confirm(`${status}にしますか？`)){
      let data = {
        status: status,
      }
      if (status=="選定/終了" && this.opportunity.type!="MENTA") {
        data['date_close'] = data['date_payment'] = new Date().toISOString().split("T")[0];
      } else if (status=="選定/終了" && this.opportunity.type=="MENTA") {
        data['date_close'] = new Date().toISOString().split("T")[0];
      } else if(status=="選定/作業中" && this.opportunity.type=="MENTA"){
        data['date_payment'] = this.opportunity.date_open
      }
      this.axios({
        method: "patch",
        url: `${this.base_url}/drm/lancers/opportunity/${this.$route.params.id}/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${this.$store.state.jwt}`,
        },
        data: data
      })
      .then(response => {
        this.load_opportunity()
        this.$store.commit("setMessageSuccess", `Updated status successfully! ${response.data.status}`)
        scrollTo(0,0)
      })
      .catch(e => {
        this.$store.commit("setMessageError", `Failed to update status! ${e.response.data.detail}`)
        scrollTo(0,0)
        // window.alert(e.response.data.detail)
      })
    }
  }
}
</script>

