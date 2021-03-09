<template>
  <v-row align-content="center" justify="center">
    <v-col md="8">
      The following statements ask you to reflect on your experience of engaging with this task. For each statement, please use the following scale to indicate what is most true for you. Please frankly share your thoughts on the task!
    </v-col>
    <!-- Rewarding && PU only?-->
    <v-col md="8">
      <v-form ref="form">
        <v-row align-content="center" justify="center">
          <v-col md="12" v-for="k in questionKeys" :key="k">
            {{questions[k]}}
            <v-radio-group v-model="answers[k]" row :rules="[validate]">
              <v-radio v-for="n in 5" :key="k+n" :label="scales[n]" :value="n"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col md="12">
            Please briefly summarize the main topic of the meeting with more than 10 words.
            <v-textarea rows="2" :value="answers.topic"
                  @change="v => answers.topic = v" counter required :rules="[validateTopic]">
            </v-textarea>
          </v-col>
          <v-col md="12">
            Please leave any comments on the task.
            <v-textarea rows="2" :value="answers.free_response"
                  @change="v => answers.free_response = v" counter required :rules="[validateTxt]">
            </v-textarea>
            <!-- <span v-if="isTextBlank" class="red--text">Please leave comments on the task!</span> -->
          </v-col>
          <v-col md="12" v-if="err" class="red--text">
            An error has occured. Please make sure you have answered all questions and try again. 
          </v-col>
          <v-col md="1" offset-md="11">
            <v-btn @click="onNextClick">NEXT</v-btn>
          </v-col>
        </v-row>
      </v-form>
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
    answersValue: function () {
      return this.answers.pus1 * this.answers.pus2 * this.answers.pus3 * this.answers.rws1 * this.answers.rws2 * this.answers.rws3 * this.answers.sanity_check
    },
    ...mapState({
      token: state => state.token
    })
  },
  data: function () {
    return {
      code: '',
      err: '',
      isTextBlank: false,
      validate: value => (value > 0 && value <= 5) ? true : 'Please select the value',
      validateTxt: value => (value.length >= 20 && value.split(' ').length >= 5) ? true : 'Please leave comments on the task!',
      validateTopic: value => (value.length >= 30 && value.split(' ').length >= 10) ? true : 'Please summarize the discussion!',
      questions: {
        fas1: 'I lost myself in this experience.',
        fas2: 'The time I spent on this task just slipped away.',
        fas3: 'I was absorbed in this experiece.',
        pus1: 'I felt frustrated while doing this task.',
        pus2: 'I found this task confusing to use.',
        pus3: 'Doing this task was taxing.',
        aes1: 'This task was attractive.',
        aes2: 'This task was aesthetically appealing.',
        aes3: 'This task appealed to my senses.',
        rws1: 'Doing this task was worthwhile.',
        rws2: 'My experience was rewarding.',
        rws3: 'I felt interested in this experience.',
        sanity_check: 'Please select "Disagree" for this question.'
      },
      answers: {
        fas1: 0,
        fas2: 0,
        fas3: 0,
        pus1: 0,
        pus2: 0,
        pus3: 0,
        aes1: 0,
        aes2: 0,
        aes3: 0,
        rws1: 0,
        rws2: 0,
        rws3: 0,
        sanity_check: 0,
        free_response: '',
        topic: '',
        status: this.$store.state.taskType
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
      this.isTextBlank = false
      this.err = false
      try {
        if (!this.$refs.form.validate()) {
          return
        }
        if (this.answers.free_response.length <= 10) {
          this.isTextBlank = true
          return
        }
        // if (this.answersValue === 0) {

        // }
        const res = await axios.post(`${process.env.VUE_APP_API_URL}/surveys/`, this.answers, {
          headers: {
            Authorization: `Token ${this.token}`
          }
        })
        console.log(res)
        this.$router.push('/Finish')
      } catch (err) {
        this.err = true
        console.log(err)
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>