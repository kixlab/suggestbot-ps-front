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
            In this task, you will read a transcript from a meeting and
            annotate lines that would significantly reinforce or harm the
            <span class="font-weight-bold">**psychological safety**</span> of
            the meeting. In psychologcially safe
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
            <img class="screenshots" src="../assets/Screenshot1-5.gif" />
            The picture above shows the task interface. On the left side of
            the interface, you'll see the actual line-by-line transcript of
            the meeting.
            The lines will be automatically presented as in the actual meeting.
            At the top of each line, you can see the timestamp to check 
            whether the lines were overlapped.           
          </p>
          <p>
            On the right side, you can see the list of annotations you made. For each line in the
            meeting transcript, the colored circle denotes who was the speaker,
            and the text shows the actual line from each participant. 
          </p>
          <p> 
            If you find a line that would make the participants either feel easier or
            harder to speak up about their own minds, click on it to start annotation.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 3" key="page3">
          <p>
            <img class="screenshots" src="../assets/Screenshot2-5.gif" />
            Upon clicking a line, the system will stop the transcript and show a box to ask your reasoning behind annotation.
          </p>
          <p>
            First, please choose whether the selected line would reinforce 
            or harm the psychological safety of the group.
          </p>
          <p>
            Then, please answer why you thought the line would affect the psychological safety of the group. 
            <br>
            <span class="red--text font-weight-bold">* Please respond sincerely. Any invalid open-ended response would make the HIT be rejected.</span>
            <!-- Finally, please write how you would give private feedback to the
            speaker as an AI moderator, and click "SUBMIT" button. -->
          </p>
          <p>
            If you made a mistake on selecting the line, you can click the red
            "DISCARD" button to cancel. After you click the "SUBMIT" button, you
            can see it from the list of annotations on the right.
          </p>
          <p>
            After submitting the annotation, you can see how your fellow workers annotated the line to reflect on your own annotation.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 4" key="page4">
          <p>
            <img class="screenshots" src="../assets/Screenshot3-2.gif" />
            The script is divided into several segments. Each segment presents
            transcript from a two-minute slice of the meeting. 
            When you reached the end of the segment you can click "SEE MORE" button to
            proceed to the next segment.
            You can freely proceed to the next segment to make more annotations.
          </p>
          <p>
            You need to annotate all lines that would significantly reinforce or harm the psychological safety of the group.
            You also need to make 
            <span class="font-weight-bold">
              at least **five** annotations</span
            > to get the task accepted.
            We'll pay you $0.10 for each extra annotation if more than two workers (excluding yourself) agreed on the annotation.
          </p>
          <p>
            <span class="red--text font-weight-bold">
              We will reject HITs with any invalid open-ended responses (e.g. repeated responses to multiple lines, irrelevant responses, copy & paste of example response).
            </span>

            <!-- We'll pay you $0.60 for each segment annotated.  -->
          </p>
        </v-col>
        <v-col md="8" v-else-if="page === 5" key="page5">
          <p>
            <img class="screenshots" src="../assets/Screenshot4-1.gif" />
          </p>
          <p>
            If you made at least five annotations and finished reading the
            current segment, you can see "SEE OTHERS ANNOTATION" button and 
            "NEXT" button at the bottom of the page.
          </p>
          <p>  
            When you click "SEE OTHERS ANNOTATION" button, you can see how 
            your fellow workers annotated the transcript to see how you performed
            on the task. 
            The lines will be in green background if you annotated them as
            reinforcing the psychological safety. They will be in red 
            background if you annotated them as harming the psychological
            safety.
            
            Please beware that <span class="font-weight-bold">after clicking the button, you are NOT ALLOWED to 
            make more annotations. </span> 
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
      this.$router.push("/Annotate");
    },
  },
  data: function () {
    return {
      page: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.screenshots {
  width: 100%;
}
</style>