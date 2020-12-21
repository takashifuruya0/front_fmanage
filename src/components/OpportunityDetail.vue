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
      // window.alert(response.data.name)
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
    return `badge badge-${color}`
  }
}
</script>

