<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-slide-x-transition :hide-on-leave="true">
        <v-col md="8" v-if="page === 1" key="page1">
          <div style="text-align: center">
            <img width="40%" src="../assets/agent.png" />
          </div>
          <p>
            We are conducting a design research for building an AI agent for
            moderating a design meeting. 
            The agent will detect when participants talk in a way that significantly
            improves or harms the atmosphere for discussion.
            Then, the agent will privately notice the speaker and give 
            appropriate feedback to the them. 
          </p>
          <p>
            We are asking your help to collect <span class="font-weight-bold">examples of the utterances</span> that
            improves or harms the discussion with <span class="font-weight-bold">the reasoning behind your decision</span>.
          </p>
          <p>
            In detail, you will act as an AI agent involved in a design meeting 
            for a new television remote control.
            The meeting is in <span class="font-weight-bold">{{meetingPhase}}</span>, {{description}}.

          </p>
          <p>
            As an agent, your goal is to find moments that would significantly reinforce or harm the
            <span class="font-weight-bold">**psychological safety**</span> of
            the group and explain your decision to the speaker. In psychologcially safe
            environments, meeting participants feel easy to speak up about
            what is on their minds, without fear of negative consequences of
            self-image, status or career.
          </p>
          <p>
            Following are some (not exhausative) behaviors that may affect the
            psychological safety:
            <v-row>
              <v-col md="6">
                Behaviors with positive effect
                <ul>
                  <li>Being positive</li>
                  <li>Being respectful</li>
                  <li>Being agreeable</li>
                </ul>
              </v-col>
              <v-col md="6">
                Behaviors with negative effect
                <ul>
                  <li>Causing annoyance</li>
                  <li>Causing frusturation</li>
                  <li>Being sarcastic</li>
                  <li>Being passive-aggressive</li>
                  <li>Dismissing others</li>
                  <li>Punishing others</li>
                  <li>Causing embarrassment</li>
                </ul>
              </v-col>
            </v-row>
          </p>
          <p>
            In other words, you will find the lines that would make the meeting
            participants agree or disagree with the statement
            <span class="red--text"
              >"In this group, it is easy to speak up about what is on my
              mind."</span
            >
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 2" key="page2">
          <p>
            <img class="screenshots" src="../assets/Debriefing1-1.gif" />
            The picture above shows the task interface. On the left side of the
            interface, you'll see the actual line-by-line transcript of the
            meeting. 
          </p>
          <p>
            At the top of each line, you can see the timestamp to check 
            whether the lines were overlapped. 
            For each line in the
            meeting transcript, the colored circle denotes who the speaker was,
            and the text shows the actual line from each participant. 
          </p>
          <p>
            On the right side, you can see the list of feedback you gave. 
            The right side also presents the numbers on how your feedback agreed with others and how many lines would need your attention.
          <p> 
            If you find a line that would make the participants either feel easier or
            harder to speak up about their own minds, click on it to start giving feedback.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 3" key="page3">
          <p>
            <img class="screenshots" src="../assets/Debriefing2-1.gif" />
            Upon clicking a line, the system will ask how you
            would give feedback to the speaker on the current situation. 
          </p>
          <p>
            First, please choose whether the selected line would reinforce or 
            harm the psychological safety of the group.
          </p>
          <p>
            <!-- meeting participants would feel easier or harder to speak up about their minds. -->
            Then, please answer why you thought the line would affect the psychological safety of the group.
          </p>
          <p>
            Finally, please write how you would explain your decision to the
            speaker as an AI moderator, and click "SUBMIT" button. If you made a mistake on selecting the line, you can click the red
            "DISCARD" button to cancel.
            <br>
            <span class="red--text font-weight-bold">* Please respond sincerely. Any invalid open-ended response would make the HIT be rejected.</span>
          </p>
          <p>
            <!-- what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button.  -->
            After you click the "SUBMIT" button, you
            can see the list of feedback you gave.
            You can also see how your fellow workers annotated the line to reflect on your own annotation.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 4" key="page4">
          <p>
            <img class="screenshots" src="../assets/Debriefing3-1.gif" />
            The script is divided into several segments. Each segment presents
            transcript from a two-minute slice of the meeting. 
            When you reached the end of the segment you can click "SEE MORE" button to
            proceed to the next segment.
            You can freely proceed to the next segment to give more feedback.
          </p>
          <p>
            In some cases, you'll be assigned to leave feedback from the middle of the meeting.
            In such cases, you can use the "SEE PREVIOUS LINES" button to have a better understanding of the meeting context from previous lines.
            You'll not be allowed to annotate previous lines. 
          </p>
          <p>
            You need to give feedback to all lines that would significantly reinforce or harm the psychological safety of the group.
            You also need to give
            <span class="font-weight-bold"> at least **five** pieces of feedback</span
            > to get the task accepted. 
            We'll pay you $0.10 for each extra piece of feedback if more than two workers (excluding yourself) agreed on whether the line would reinforce or harm the psychological safety of the group. 
          </p>
          <p>
            <span class="red--text font-weight-bold">
              We will reject HITs with any invalid open-ended feedback (e.g. repeated responses to multiple lines, irrelevant responses such as "Good task", copy & paste of the example response, copy & paste of random sentence from the Internet).
            </span>

            <!-- We'll pay you $0.60 for each segment annotated.  -->
          </p>
        </v-col>
        <v-col md="8" v-else-if="page === 5" key="page5">
          <p>
            <img class="screenshots" src="../assets/Debriefing4-1.gif" />
          </p>
          <p>
            If you made at least five annotations and finished reading the
            current segment, you can see "SEE OTHERS' FEEDBACK" button and 
            "NEXT" button at the bottom of the page.
          </p>
          <p>  
            When you click "SEE OTHERS' FEEDBACK" button, you can see how 
            your fellow workers gave feedback on the transcript to see how you performed
            on the task. 
            The lines that you've given feedback to will be emphasized with stripes.  
            
            Please beware that <span class="font-weight-bold">after clicking the button, you are NOT ALLOWED to 
            give more feedback. </span> 
          </p>
          <p>
            You can click the "NEXT" button to continue to the post-task survey.
          </p>
        </v-col>
      </v-slide-x-transition>
      <v-col md="8">
        <v-row>
          <v-col md="2" v-if="page > 1">
            <v-btn color="error" @click="page -= 1"> PREVIOUS PAGE </v-btn>
          </v-col>
          <v-spacer />
          <v-col md="2" v-if="page < 5">
            <v-btn color="success" @click="page += 1"> NEXT PAGE </v-btn>
          </v-col>
          <v-col md="2" v-if="page === 5">
            <v-btn color="primary" @click="onNextClick">PROCEED TO TASK </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "tutorial",
  methods: {
    onNextClick: function () {
      this.$router.push("/AnnotatePlain");
    },
  },
  data: function () {
    return {
      page: 1,
    };
  },
  computed: {
    meetingPhase: function () {
      const dataset = this.$store.state.dataset
      if (dataset.endsWith('a')) {
        return 'the first phase'
      } else if (dataset.endsWith('b')) {
        return 'the second phase'
      } else if (dataset.endsWith('c')) {
        return 'the third phase'
      } else if (dataset.endsWith('d')) {
        return 'the fourth phase'
      } else {
        return ''
      }
    },
    description: function () {
      const dataset = this.$store.state.dataset
      if (dataset.endsWith('a')) {
        return 'where the participants are getting acquainted with each other and the task'
      } else if (dataset.endsWith('b')) {
        return 'in which the team sets the user requirements, the technical functionality, and the working design'
      } else if (dataset.endsWith('c')) {
        return 'in which the team determines the conceptual specification for the components, properties, materials, and user interface for the remote control'
      } else if (dataset.endsWith('d')) {
        return 'where the team finalizes the look-and-feel and user interface and evaluates the result'
      } else {
        return ''
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.screenshots {
  width: 100%;
}
</style>