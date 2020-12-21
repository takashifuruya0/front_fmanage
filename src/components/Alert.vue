<template>
  <div class="alert-badge"> 
    <div 
      class="alert alert-success" id="alert_success" 
      v-show="this.$store.state.msgs_success" 
      >
      <button type="button" class="close" data-dismiss="alert" v-on:click="hide_success()">&times;</button>
      <strong>SUCCESS</strong> {{this.$store.state.msgs_success}}
    </div>
    <div 
      class="alert alert-info" id="alert_info"
      v-show="this.$store.state.msgs_info" 
      >
      <button type="button" class="close" data-dismiss="alert" v-on:click="hide_info()">&times;</button>
      <strong>INFO</strong> {{this.$store.state.msgs_info}}
    </div>
    <div 
      class="alert alert-warning" id="alert_warning" 
      v-show="this.$store.state.msgs_warning" 
      >
      <button type="button" class="close" data-dismiss="alert" v-on:click="hide_warning()">&times;</button>
      <strong>WARNING</strong> {{this.$store.state.msgs_warning}}
    </div>
    <div 
      class="alert alert-danger" id="alert_error" 
      v-show="this.$store.state.msgs_error" 
      >
      <button type="button" class="close" data-dismiss="alert" v-on:click="hide_error()">&times;</button>
      <strong>ERROR</strong> {{this.$store.state.msgs_error}}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue} from 'vue-class-component';

@Options({
  props: {
    msg: String,
    type: String,
    msgs: {
      success: String,
      info: String,
      warning: String,
      error: String,
    }
  },
  components:{
  }
})

export default class AlertBadge extends Vue {
  type?: string;

  memo = "Default"

  msgs = {
    success: null,
    info: null,
    warning: null,
    error: null,
  }
  hidden_status = {
    success: false,
    info: false,
    warning: false,
    error: false,
  }

  hide_success () {
    // this.hidden_status.success = true
    this.$store.commit("setMessageSuccess", null)
  }
  hide_info () {
    // this.hidden_status.info = true
    this.$store.commit("setMessageInfo", null)
  }
  hide_warning () {
    // this.hidden_status.warning = true
    this.$store.commit("setMessageWarning", null)
  }
  hide_error () {
    // this.hidden_status.error = true
    this.$store.commit("setMessageError", null)
  }
}
</script>