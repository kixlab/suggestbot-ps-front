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
  methods: {
    onNextClick: async function () {
      this.err = false
      this.msg = ''
      try {
        const response = await axios.post(`${process.env.API_URL}/register/`, {
          username: this.id,
          password: this.id,
          firstname: 'Plain'
        })
        const result = response.data

        this.$store.commit('setToken', result.token)
        this.$store.commit('setUsername', result.username)

        this.$router.push('tutorial')
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