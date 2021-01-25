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
            improves or harms the discussion and appropriate <span class="font-weight-bold">private feedback messages</span>
            in such cases.
          </p>
          <p>
            In detail, you will act as an AI agent while reading a transcript of a meeting 
            for designing a new remote control.
          </p>
          <p>
            As an agent, your goal is to find moments that would significantly reinforce or harm the
            <span class="font-weight-bold">**psychological safety**</span> of
            the group and give private feedback to the speaker. In psychologcially safe
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
            <img class="screenshots" src="../assets/Moderating1.gif" />
            The picture above shows the task interface. On the left side of the
            interface, you'll see the actual line-by-line transcript of the
            meeting. 
          </p>
          <p>
            The lines will be automatically presented as in the actual meeting.
            At the top of each line, you can see the timestamp to check 
            whether the lines were overlapped. 
          </p>
          <p>
            On the right side, you can see the list of feedback you gave. For each line in the
            meeting transcript, the colored circle denotes who was the speaker,
            and the text shows the actual words from each participant. 
          </p>
          <p> 
            If you find a line that would make the participants either feel easier or
            harder to speak up about their own minds, click on it to start giving feedback.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 3" key="page3">
          <p>
            <img class="screenshots" src="../assets/Moderating2-1.gif" />
            Upon clicking a line, the system will stop the transcript and ask how you
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
            Finally, please write how you would give private feedback to the
            speaker as an AI moderator, and click "SUBMIT" button.
          </p>
          <p>
            <!-- what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button.  -->
            If you made a mistake on selecting the line, you can click the red
            "DISCARD" button to cancel. After you click the "SUBMIT" button, you
            can see the list of feedback you gave.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 4" key="page4">
          <p>
            <img class="screenshots" src="../assets/Screenshot4.gif" />
            The script is divided into several segments. Each segment presents
            transcript from a five-minute slice of the meeting. 
            When you reached the end of the segment you can click "SEE MORE" button to
            proceed to the next segment.
            You can freely proceed to the next segment to give more feedback.
          </p>
          <p>
            You need to give feedback to all lines that would significantly reinforce or harm the psychological safety of the group.
            You also need to give
            <span class="font-weight-bold"> at least **five** pieces of feedback</span
            > to get the task accepted. 
            We'll pay you $0.10 for each extra piece of feedback if more than two workers (excluding yourself) agreed on whether the line would reinforce or harm the psychological safety of the group. 
          </p>
          <p>
          </p>
        </v-col>
        <v-col md="8" v-else-if="page === 5" key="page5">
          <p>
            <img class="screenshots" src="../assets/Screenshot3-1.gif" />
            If you gave feedback to at least five lines and finished the
            current segment, you can see a green "NEXT" button at the bottom of
            the page. If you left feedback as much as you want, click
            it to continue.
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
      this.$router.push("AnnotatePlain");
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