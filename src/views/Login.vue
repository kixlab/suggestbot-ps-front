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
    if (this.$route.params.dataset) {
      this.$store.commit('setDataset', this.$route.params.dataset)
      this.$store.commit('setInitialTime', (Number(this.$route.params.initialTime) || 0))
      this.$store.commit('setFinishTime', (Number(this.$route.params.initialTime) || 0))
    } else if (this.$route.params.datasetSet) {
      const datasetSet = this.$route.params.datasetSet
      const random = Math.floor(Math.random() * this.datasets[datasetSet].length)
      const dataset = this.datasets[datasetSet][random].dataset
      const initialTime = this.datasets[datasetSet][random].initialTime
      this.$store.commit('setDataset', dataset)
      this.$store.commit('setInitialTime', initialTime)
      this.$store.commit('setFinishTime', initialTime)
    }


  },
  computed: {
    rw: function () {
      const rw = randomWords({exactly: 4, maxLength: 5})
      return rw.toString()
    },
    datasets: function () {
      return {
        ES2004: [
          {
            dataset: 'ES2004b',
            initialTime: 1770
          },
          {
            dataset: 'ES2004c',
            initialTime: 1740
          },
          {
            dataset: 'ES2004d',
            initialTime: 1500
          }
        ],
        ES2005: [
          {
            dataset: 'ES2005b',
            initialTime: 1080
          },
          {
            dataset: 'ES2005c',
            initialTime: 960
          },
          {
            dataset: 'ES2005d',
            initialTime: 780
          }
        ],
        ES2006: [
          {
            dataset: 'ES2006a',
            initialTime: 1050
          },
          {
            dataset: 'ES2006b',
            initialTime: 1500
          },
          {
            dataset: 'ES2006c',
            initialTime: 930
          },
          {
            dataset: 'ES2006d',
            initialTime: 840
          }
        ],
        ES2007: [
          {
            dataset: 'ES2007a',
            initialTime: 1020
          },
          {
            dataset: 'ES2007b',
            initialTime: 1110
          },
          {
            dataset: 'ES2007c',
            initialTime: 990
          },
          {
            dataset: 'ES2007d',
            initialTime: 720
          }
        ],
        ES2008: [
          {
            dataset: 'ES2008a',
            initialTime: 900
          },
          {
            dataset: 'ES2008b',
            initialTime: 960
          },
          {
            dataset: 'ES2008c',
            initialTime: 840
          },
          {
            dataset: 'ES2008d',
            initialTime: 690
          }
        ],
      }
    }
  },
  methods: {
    onNextClick: async function () {
      this.err = false
      this.msg = ''
      const taskType = 'Moderate-Debriefing'
      const id = `${this.id}-${this.$store.state.dataset}-${taskType}-${this.$store.state.initialTime}`
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
