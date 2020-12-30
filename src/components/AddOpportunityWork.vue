<template>
  <div class="add-opportunity-work">
    <form 
      class="form"
      @submit.prevent="formSubmit">
      <h5>Add OpportunityWork {{id}}</h5>
      <div class="form-group">
        <label for="id_start_date">Date: </label>
        <input
          class="form-control"
          v-model="start_date"
          type="date"
          id="id_start_date">
        <label for="id_start_time">StartTime: </label>
        <input
          class="form-control"
          v-model="start_time"
          v-on:input="show(start_time)"
          type="time"
          id="id_start_time">
        <label for="id_end_time">EndTime: </label>
        <input
          class="form-control"
          v-model="end_time"
          type="time"
          id="id_end_time">
      </div>
      <div class="form-group">
        <label for="id_memo">Memo: </label>
        <textarea
          class="form-control"
          v-model="memo"
          id="id_memo"></textarea>
      </div>
      <button
        class="btn btn-primary"
        type="submit">
        <fa icon="plus" type="fas" class="classname" width=12></fa> Submit
      </button>
    </form>
  </div>
</template>

<script type="ts">
import axios from 'axios'

export default {
  props: {
    id: Number,
  },
  methods: {
    formSubmit (event) {
      const payload = {
        datetime_start: `${this.start_date} ${this.start_time}`,
        datetime_end: `${this.start_date} ${this.end_time}`,
        working_time: 0,
        memo: this.memo,
        opportunity: this.id
      }
      const ds = new Date(payload.datetime_start)
      const de = new Date(payload.datetime_end)
      payload.working_time = (de - ds)/60/1000
      if (payload.working_time == null){
        if(window.confirm(`${payload.datetime_start}~${payload.datetime_end} : ${ds}~${de}`)){return}
      }
      axios({
        method: "post",
        url: "https://www.fk-management.com/drm/lancers/opportunitywork/",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${this.$store.state.jwt}`,
        },
        data: payload
      })
      .then((response) => {
        this.$store.commit("setMessageSuccess", `Created successfully! ${response.data.working_time} min`)
        event.target.reset();
        scrollTo(0, 0)
      })
      .catch((error) => {
        // window.alert(`Error ${error.response.status} ${error.response.data.detail}`)
        if (error.response.status == 401){
          this.$store.commit("setMessageError", "Not authorized")
          this.$router.push({name: 'Login'})
        } else {
          this.$store.commit("setMessageWarning", `${error.response.data.detail}`)
        }
      })
    },
    show(val) {
      // window.alert(new Date(`${this.start_date} ${this.start_time}`))
    }
  }
}

// {
//   "id": 124,
//   "created_at": "2020-10-28T23:22:59.454192+09:00",
//   "last_updated_at": "2020-12-08T22:51:09.647657+09:00",
//   "is_active": true,
//   "sync_id": 124,
//   "datetime_start": "2020-10-28T18:00:00+09:00",
//   "datetime_end": "2020-10-28T20:00:00+09:00",
//   "working_time": 120,
//   "is_in_calendar": false,
//   "memo": null,
//   "created_by": 1,
//   "last_updated_by": 1,
//   "opportunity": 413
// }
</script>
