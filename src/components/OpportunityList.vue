<template>
  <div class="opportunity-list">
    <h3>{{msg}}</h3>
        <!-- <b-button variant="primary">bootstrap</b-button> -->
    <a class="btn btn-success" v-on:click="move(previous)" v-if="previous!=null">Previous</a>
    <a class="btn btn-primary" :href="current">{{current}}</a>
    <a class="btn btn-success" v-on:click="move(next)" v-if="next!=null">Next</a>
    <!-- <a class="btn btn-info" href="/#/sub-business?offset=20">test</a> -->
    <table class="table table-responsive">
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
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="opp in opportunities"
          :key="opp.id"
        >
          <td>{{opp.id}}</td>
          <td>{{opp.name}}</td>
          <td>
            <label class="badge bg-info">
            {{opp.status}}
            </label>
          </td>
          <td>{{opp.type}}</td>
          <td>{{opp.category}}</td>
          <td>{{opp.client}}</td>
          <td>{{opp.date_open}}</td>
          <td>{{numberFormat(opp.val)}}</td>
          <td>
            <button class="btn btn-primary">Detail</button>
          </td>
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

  opportunities = []
  
  mounted () {
    if ("offset" in this.$route.query) {
      this.offset = Number(this.$route.query.offset);
    } else {
      this.offset = 0;
    }
    this.current = new URL(`http://127.0.0.1:8000/drm/lancers/opportunity/?limit=20&offset=${this.offset}`)
    this.move(this.current)  
    // this.axios({
    //   method: "get",
    //   // url: "https://www.machinemart.store/api/item/",
    //   url: `http://127.0.0.1:8000/drm/lancers/opportunity/?limit=20&offset=${this.offset}`,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   this.current = new URL(`http://127.0.0.1:8000/drm/lancers/opportunity/?limit=20&offset=${this.offset}`);
    //   if (response.data.next != null ) {
    //     this.next = response.data.next;
    //   }
    //   if (response.data.previous != null ) {
    //     this.previous = response.data.previous;
    //   }
    //   // for (const i in response.data.results){
    //   //   response.data.results[i].val = this.numberFormat(response.data.results[i].val)
    //   // }
    //   this.opportunities = response.data.results;
    // })
    // .catch(e => {
    //   window.alert(e);
    // })
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
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>