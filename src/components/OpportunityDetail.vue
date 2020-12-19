<template>
  <div class="opportunity-detail">
    <h3>{{msg}}</h3>
    <!-- {{opportunity.name}}
    {{opportunity.type}} -->
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

export default class OpportunityDetail extends Vue {
  msg?: string;
  // opportunity: any;
  opportunity = {
    'name': null,
    "val": 0,
    "date_open": null,
    "status": null,
    "type": null,
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
    return `badge bg-${color}`
  }
}
</script>

