<template>
  <v-row align-content="center" justify="center">
    <v-col md="8">
      The following statements ask you to reflect on your experience of engaging with this task. For each statement, please use the following scale to indicate what is most true for you.
    </v-col>
    <!-- Rewarding && PU only?-->
    <v-col md="8" v-for="k in questionKeys" :key="k">
      {{questions[k]}}
      <v-radio-group v-model="answers[k]" row>
        <v-radio v-for="n in 5" :key="k+n" :label="scales[n]" :value="n"></v-radio>
      </v-radio-group>
    </v-col>
    <v-col md="8" v-if="err">
      An error has occured. Please make sure you have answered all questions and try again. 
    </v-col>
    <v-col md="1" offset-md="7">
      <v-btn @click="onNextClick">NEXT</v-btn>
    </v-col>
    
    <!-- <v-col md="8">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScB-sgvtZJeMF29SDIAUYk_u1_FwsIHiQypIkSyRWVwTaI4Ng/viewform?embedded=true" width="640" height="378" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    </v-col>
    <v-col md="8">
      Please type the code you received from the survey. The token for this HIT will be given on the next page!
      <v-text-field
        v-model="code"
        :rules="[validate]"
        placeholder="Code from the survey">
        <template v-slot:append-outer>
          <v-btn
            @click="onNextClick"
            small
            primary>
            NEXT
          </v-btn>
        </template>
      </v-text-field>
    </v-col> -->
  </v-row>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "SurveyPage",
  computed: {
    questionKeys: function () {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
      }
      const arr = Object.keys(this.questions)
      shuffleArray(arr)
      return arr
    },
    ...mapState({
      token: state => state.token
    })
  },
  data: function () {
    return {
      code: '',
      validate: value => (value > 0 && value <= 5) ? true : 'Please select the value',
      questions: {
        // fas1: 'I lost myself in this experience.',
        // fas2: 'The time I spent on this task just slipped away.',
        // fas3: 'I was absorbed in this experiece.',
        pus1: 'I felt frustrated while doing this task',
        pus2: 'I found this task confusing to use.',
        pus3: 'Doing this task was taxing.',
        // aes1: 'This task was attractive.',
        // aes2: 'This task was aesthetically appealing.',
        // aes3: 'This task appealed to my senses.',
        rws1: 'Doing this task was worthwhile.',
        rws2: 'My experience was rewarding.',
        rws3: 'I felt interested in this experience.',
        sanity_check: 'Please select "Disagree" for this question.'
      },
      answers: {
        // fas1: 0,
        // fas2: 0,
        // fas3: 0,
        pus1: 0,
        pus2: 0,
        pus3: 0,
        // aes1: 0,
        // aes2: 0,
        // aes3: 0,
        rws1: 0,
        rws2: 0,
        rws3: 0,
        sanity_check: 0,
        status: 'Plain'
      },
      scales: {
        '1': 'Strongly Disagree',
        '2': 'Disagree',
        '3': 'Neither agree nor disagree',
        '4': 'Agree',
        '5': 'Strongly agree'
      }
    }
  },
  methods: {
    onNextClick: async function () {
      try {
        const res = await axios.post(`${process.env.API_URL}/surveys/`, this.answers, {
          headers: {
            Authorization: `Token ${this.token}`
          }
        })
        console.log(res)
        this.$router.push('/Finish')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>