<template>
  <v-card class="moment--box" shaped>
    <v-card-title style="padding-bottom: 0;">
      <span v-if="plain">Annotations for </span>
      <span v-else>Moderate the meeting for </span>

      <v-avatar size="1.1em" :color="color" style="margin-left: 0.25em;">
        {{currentLine ? currentLine.speaker : ''}}
      </v-avatar>'s words
    </v-card-title>
    <v-card-text style="padding-bottom: 0;">
      <v-row>
        <v-col md="12" v-if="page >= 1" key="page1">
          <div>
            Would this line reinforce or harm the psychological safety of the meeting participants?
          </div>
          <v-btn-toggle block v-model="direction">
            <v-btn value="POSITIVE" text color="green" @click="page = 2; reason = ''">
              Reinforce
            </v-btn>
            <v-btn value="NEGATIVE" text color="red"  @click="page = 2; reason = ''">
              Harm
            </v-btn>
          </v-btn-toggle>
          <div v-if="choice" class="red--text">Please choose between two options.</div>
        </v-col>
        <v-slide-y-transition>
          <v-col md="12" v-if="page >= 2" key="page2">
            <span v-if="direction && direction !== ''">Why do you think so? </span>
            <v-radio-group v-model="reason" v-if="direction === 'POSITIVE'" @change="page = reason === '' ? 2 : 3; possibleComment = ''">
              <v-row no-gutters>
                <v-col md="6">
                  <v-radio label="Being positive" value="Being positive">
                  </v-radio>
                  <v-radio label="Being respectful" value="Being respectful">
                  </v-radio>
                </v-col>
                <v-col md="6">
                  <v-radio label="Being agreeable" value="Being agreeable">
                  </v-radio>
                </v-col>
                <v-col md="12">
                  <v-radio value="Other">
                    <template v-slot:label>
                      <span style="padding-right: 1em;">Other</span>
                      <v-text-field v-model="reasonOther" :disabled="reason !== 'Other'"  placeholder="Please describe the reason">
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
            <v-radio-group v-model="reason" v-if="direction === 'NEGATIVE'" @change="page = reason === '' ? 2 : 3; possibleComment = ''">
              <v-row no-gutters>
                <v-col md="6">
                  <v-radio label="Causing annoyance" value="Causing annoyance">
                  </v-radio>
                  <v-radio label="Causing frusturation" value="Causing frusturation">
                  </v-radio>
                  <v-radio label="Being sarcastic" value="Being sarcastic">
                  </v-radio>
                  <v-radio label="Causing embarrassment" value="Causing embarrassment">
                  </v-radio>
                </v-col>
                <v-col md="6">
                  <v-radio label="Being passive-aggressive" value="Being passive-aggressive">
                  </v-radio>
                  <v-radio label="Dismissing others" value="Dismissing others">
                  </v-radio>
                  <v-radio label="Punishing others" value="Punishing others">
                  </v-radio>
                </v-col>
                <v-col md="12">
                  <v-radio value="Other">
                    <template v-slot:label>
                      <span style="padding-right: 1em;">Other</span>
                      <v-text-field v-model="reasonOther" :disabled="reason !== 'Other'"  placeholder="Please describe the reason">
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-slide-y-transition>
        <v-slide-y-transition>
          <v-col md="12" v-if="page >= 2" key="page2">
            <span v-if="direction === 'POSITIVE'">How did the selected line reinforced the psychological safety of the group?</span>
            <v-radio-group v-model="reason" v-if="direction === 'POSITIVE'" @change="page = reason === '' ? 2 : 3; possibleComment = ''">
              <v-row no-gutters>
                <v-col md="6">
                  <v-radio label="Being positive" value="Being positive">
                  </v-radio>
                  <v-radio label="Being respectful" value="Being respectful">
                  </v-radio>
                </v-col>
                <v-col md="6">
                  <v-radio label="Being agreeable" value="Being agreeable">
                  </v-radio>
                </v-col>
                <v-col md="12">
                  <v-radio value="Other">
                    <template v-slot:label>
                      <span style="padding-right: 1em;">Other</span>
                      <v-text-field v-model="reasonOther" :disabled="reason !== 'Other'"  placeholder="Please describe the reason">
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
            <span v-if="direction === 'NEGATIVE'"> How did the selected line harmed the psychological safety of the group? </span>
            <v-radio-group v-model="reason" v-if="direction === 'NEGATIVE'" @change="page = reason === '' ? 2 : 3; possibleComment = ''">
              <v-row no-gutters>
                <v-col md="6">
                  <v-radio label="Causing annoyance" value="Causing annoyance">
                  </v-radio>
                  <v-radio label="Causing frusturation" value="Causing frusturation">
                  </v-radio>
                  <v-radio label="Being sarcastic" value="Being sarcastic">
                  </v-radio>
                  <v-radio label="Causing embarrassment" value="Causing embarrassment">
                  </v-radio>
                </v-col>
                <v-col md="6">
                  <v-radio label="Being passive-aggressive" value="Being passive-aggressive">
                  </v-radio>
                  <v-radio label="Dismissing others" value="Dismissing others">
                  </v-radio>
                  <v-radio label="Punishing others" value="Punishing others">
                  </v-radio>
                </v-col>
                <v-col md="12">
                  <v-radio value="Other">
                    <template v-slot:label>
                      <span style="padding-right: 1em;">Other</span>
                      <v-text-field v-model="reasonOther" :disabled="reason !== 'Other'"  placeholder="Please describe the reason">
                      </v-text-field>
                    </template>
                  </v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
        </v-slide-y-transition>
        <v-slide-y-transition>
          <v-col md="12" v-if="page === 3" key="page3">
            <template v-if="reasoning">
              <div>
                Please explain why the selected line would {{direction === 'POSITIVE' ? 'reinforce' : 'harm'}} the psychological safety in detail.
                <v-text-field
                  dense
                  :value="possibleComment"
                  @change="v => possibleComment = v">
                </v-text-field>
              </div>
            </template>
            <template v-if="moderating">
              <div>
                As an AI moderator, please explain to 
                <v-avatar size="1.2em" :color="color" style="margin-left: 0.2em;">
                  {{currentLine ? currentLine.speaker : ''}}
                </v-avatar>
                that the selected line {{direction === 'POSITIVE' ? 'reinforced' : 'harmed'}} the psychological safety
                ?
                <v-text-field
                  dense
                  :value="possibleComment"
                  @change="v => possibleComment = v">
                </v-text-field>
              </div>
            </template>
            <template v-else-if="roletaking">
              <div v-if="plain">If you could phrase {{currentLine ? currentLine.speaker : ''}}'s words differently, what would you like to say? </div>
              <div v-else>Next time, {{currentLine ? currentLine.speaker : ''}} might want to say </div>
              <v-text-field
                dense
                :value="possibleLine"
                @change="v => possibleLine = v">
              </v-text-field>
            </template>
            <template v-if="long">
              <span class="red--text">Please respond to the question with more than 15 characters.</span>
            </template>
          </v-col>
        </v-slide-y-transition>
      </v-row>
    </v-card-text>
    <v-card-text v-if="err">
      <span class="red--text">An error has occured. Please try submitting again.</span>
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse" >
      <v-btn v-if="page === 3"
        text
        color="success"
        @click="submitMoment">
        SUBMIT
      </v-btn>
      <v-btn
        text
        color="error"
        @click="discardMoment">
        DISCARD
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'MomentBox',
  props: {
    moment: Number,
    currentLine: Object,
    plain: Boolean,
    type: String
    // speakers: Array
  },
  computed: {
    color: function () {
      if (this.currentLine?.speaker === 'A') {
        return 'blue'
      } else if (this.currentLine?.speaker === 'B') {
        return 'pink'
      } else if (this.currentLine?.speaker === 'C') {
        return 'green'
      } else if (this.currentLine?.speaker === 'D') {
        return 'yellow'
      } else {
        return 'cyan'
      }
    },
    reasoning: function () {
      return this.type === 'reasoning'
    },
    moderating: function () {
      return this.type === 'moderating'
    },
    roletaking: function () {
      return this.type === 'roletaking'
    },
    ...mapState({
      token: state => state.token,
      dataset: state => state.dataset
    })
  },
  methods: {
    discardMoment: function () {
      this.direction = 'NEUTRAL'
      this.speaker = '-1'
      this.reason = ''
      this.reasonOther = ''
      this.possibleComment = ''
      this.possibleLine = ''
      this.$emit('close-moment-box')
      this.err = false
      this.long = false
      this.choice = false
      this.page = 1
    },
    submitMoment: async function () {
      try {
        this.err = false
        this.long = false
        this.choice = false
        if ((this.direction !== 'POSITIVE') && (this.direction !== 'NEGATIVE')) {
          this.choice = true
        }
        if ((this.reason === 'Other')) {
          this.reason = this.reasonOther
        } 
        if ((this.reasoning && ((this.reason.length < 10) || (this.possibleComment.length < 15))) 
          || (this.moderating && ((this.reason.length < 10) || (this.possibleComment.length < 15))) 
          || (this.roletaking && (this.possibleLine.length < 15))) {
            console.log('aaaa')
            this.long = true
        }
        if (this.choice || this.long) {
          return
        }
        const res = await axios.post(`${process.env.VUE_APP_API_URL}/moments/`,
        {
          affected_speaker: this.speaker,
          timestamp: this.moment,
          direction: this.direction,
          reason: this.reason,
          possible_comment: this.possibleComment,
          possible_line: this.possibleLine,
          dataset: this.dataset,
          line: this.currentLine?.id
        },
        {
          headers: {
            'Authorization': `Token ${this.token}`
          }
        })
        this.direction = 'NEUTRAL'
        this.speaker = '-1'
        this.reason = ''
        this.possibleComment = ''
        this.possibleLine = ''
        this.reasonOther = ''
        this.page = 1
        this.$emit('moment-saved', res.data)
      } catch (err) {
        console.log(err)
        this.err = true
        //TODO: Error occured, try again
      }

      
    } 
  },
  data: function () {
    return {
      direction: 'NEUTRAL',
      speaker: '-1',
      reason: '',
      possibleComment: '',
      possibleLine: '',
      speakers: ['A', 'B', 'C', 'D'],
      err: false,
      long: false,
      choice: false,
      page: 1,
      reasonOther: ''
    }
  },
}
</script>
<style lang="scss" scoped>
.moment--box {
  margin-top: 1em;
}
</style>