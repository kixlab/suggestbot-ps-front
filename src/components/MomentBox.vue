<template>
  <v-card class="moment--box">
    <v-card-title style="padding-bottom: 0;">
      <span v-if="plain">Annotations for </span>
      <span v-else>Moderate the meeting for </span>

      <v-avatar size="1.1em" :color="color" style="margin-left: 0.25em;">
        {{currentLine ? currentLine.speaker : ''}}
      </v-avatar>'s words
    </v-card-title>
    <v-card-text style="padding-bottom: 0;">
      <v-row>
        <!-- <v-col md="12">
          <div>Among the meeting participants, who's psychological safety is affected the most?</div>
          <v-btn-toggle v-model="speaker" mandatory>
            <v-btn v-for="s in speakers" :key="s" :value="s">
              {{s}}
            </v-btn>
          </v-btn-toggle>
        </v-col> -->
        <v-col md="12">
          <div>
            After this line, how would the meeting participants think about the statement <span class="red--text">"In this group, it is easy to speak up about what is on my mind."</span>?  </div>
          <v-btn-toggle block v-model="direction">
            <v-btn value="POSITIVE" text color="green">
              Agree more
            </v-btn>
            <!-- <v-btn value="NEUTRAL" text color="grey">
              Neutral
            </v-btn> -->
            <v-btn value="NEGATIVE" text color="red">
              Disagree more
            </v-btn>
          </v-btn-toggle>
          <div v-if="choice" class="red--text">Please choose between two options.</div>
        </v-col>
        <v-col md="12" v-if="!plain">
          <div v-if="plain">If you could intervene in the meeting, what would you like to say to {{currentLine ? currentLine.speaker : ''}}? </div>
          <div v-else>I'd like to stop the meeting by saying that</div>
          <v-text-field
            dense
            :value="possibleComment"
            @change="v => possibleComment = v">
          </v-text-field>
        </v-col>
        <v-col md="12" v-if="plain">
          <div v-if="plain">Why do you think this line would affect the psychological safety of the group? </div>
          <div v-else>
            <!-- <v-avatar size="1.2em" :color="color"> -->
              {{currentLine ? currentLine.speaker : ''}}'s words harmed the psychological safety of the group because

            <!-- </v-avatar> -->
          </div>
          <v-text-field
            dense
            :value="reason"
            @change="v => reason = v">
          </v-text-field>
        </v-col>
        <v-col md="12" v-if="!plain">
          <div v-if="plain">If you were the moderator of this meeting, what would you advise to {{currentLine ? currentLine.speaker : ''}} to support others in easily speaking up their mind? </div>
          <!-- <div v-if="plain">If you could intervene in the meeting, what would you like to say to {{currentLine ? currentLine.speaker : ''}}? </div> -->
          <div v-else>As a moderator, I'd like to say to {{currentLine ? currentLine.speaker : ''}}</div>
          <v-text-field
            dense
            :value="possibleComment"
            @change="v => possibleComment = v">
          </v-text-field>
        </v-col>
        <v-col md="12" v-if="!plain">
          <div v-if="plain">If you could phrase {{currentLine ? currentLine.speaker : ''}}'s words differently, what would you like to say? </div>
          <div v-else>Next time, {{currentLine ? currentLine.speaker : ''}} might want to say </div>

          <v-text-field
            dense
            :value="possibleLine"
            @change="v => possibleLine = v">
          </v-text-field>
        </v-col>
        <v-col v-if="long">
          <span class="red--text">Please respond to the question with more than 25 characters.</span>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="err">
      <span class="red--text">An error has occured. Please try submitting again.</span>
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn
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
    plain: Boolean
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
      this.possibleComment = ''
      this.possibleLine = ''
      this.$emit('close-moment-box')
      this.err = false
      this.long = false
      this.choice = false
    },
    submitMoment: async function () {
      try {
        this.err = false
        this.long = false
        this.choice = false
        if (this.direction === 'NEUTRAL') {
          this.choice = true
        }
        if (this.reason.length < 25) {
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
      long: false
    }
  },
}
</script>
<style lang="scss" scoped>
.moment--box {
  margin-top: 1em;
}
</style>