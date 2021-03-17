<template>
  <v-row align-content="center" justify="center">
    <v-col md="8">
      Please type your MTurk ID below:
    </v-col>
    <v-col md="8">
      <v-text-field
        v-model="id"
        @keyup.enter="onNextClick"
        :error="err"
        :error-messages="msg"
        placeholder="MTurk ID Here">
        <template v-slot:append-outer>
          <v-btn
            @click="onNextClick"
            small
            primary>
            NEXT
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import randomWords from 'random-words'

import axios from 'axios'
export default {
  name: 'login',
  data: function () {
    return {
      id: '',
      err: false,
      msg: ''
    }
  },
  mounted: function () {
    this.$store.commit('setDataset', this.$route.params.dataset)
    this.$store.commit('setInitialTime', (Number(this.$route.params.initialTime) || 0))
    this.$store.commit('setFinishTime', (Number(this.$route.params.initialTime) || 0))

  },
  computed: {
    rw: function () {
      const rw = randomWords({exactly: 4, maxLength: 5})
      return rw.toString()
    }
  },
  methods: {
    onNextClick: async function () {
      this.err = false
      this.msg = ''
      const taskType = 'Moderate-Debriefing'
      const id = `${this.id}-${this.$route.params.dataset}-${taskType}`
      console.log(id)
      console.log(process.env.VUE_APP_API_URL)
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/register/`, {
          username: id, // This should be changed to ID to be open to multiple submissions
          password: this.id,
          first_name: taskType,
          last_name: `${this.id} Token ${this.rw}`
        })
        const result = response.data

        this.$store.commit('setToken', result.token)
        this.$store.commit('setUsername', result.username)
        this.$store.commit('setTurkerId', result.turker_id)
        this.$store.commit('setTaskType', taskType)
        this.$router.push('/Scenario')
      } catch (err) {
        console.log(err.response)
        if (err.response.status === 403) {
          this.err = true
          this.msg = `You've already participated in the task.`
        }
      }
      
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
