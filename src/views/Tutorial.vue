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
            moderating a design meeting. The agent will detect the lines that
            would affect the psychological safety of the group and give
            appropriate feedback to the speaker. We are asking your help to
            collect data for it.
          </p>
          <p>
            In this task, you will see a chat log of a meeting for designing a
            new remote control and act as an AI moderator. As a moderator, your
            goal is to find moments that would reinforce or harm the
            <span class="font-weight-bold">**psychological safety**</span> of
            the group and give private feedback. In psychologcially safe
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
            meeting. At the top of each line, you can see the timestamp to see 
            whether the lines were overlapped. 
          </p>
          <p>
            On the right side, you can see the list of annotations you've made. For each line in the
            meeting transcript, the colored circle denotes who was the speaker,
            and the text shows the actual words from each participant. 
          </p>
          <p> 
            If you find a line that would make the participants either feel easier or
            harder to speak up about their own minds from the transcript, click on it to start labeling.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 3" key="page3">
          <p>
            <img class="screenshots" src="../assets/Moderating2-1.gif" />
            Upon clicking a line, the system will show a box to ask how you
            would moderate the current situation.
          </p>
          <p>
            First, please annotate whether
            the selected line would reinforce or harm the psychological safety
            of the meeting.
          </p>
          <p>
            <!-- meeting participants would feel easier or harder to speak up about their minds. -->
            Then, please answer why you thought the line would affect the psychological safety.
            Finally, please write how you would give feedback to the
            speaker as an AI moderator, and click "SUBMIT" button.
          </p>
          <p>
            <!-- what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button.  -->
            If you made a mistake on selecting the line, you can click the red
            "DISCARD" button to cancel. After you click the "Submit" button, you
            can see the list of annotations you added.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 4" key="page4">
          <p>
            <img class="screenshots" src="../assets/Screenshot4.gif" />
            The script is divided into multiple segments. Each segment contains transcript from a
            five-minute slice of the meeting. When you reached the end of the
            segment you can click "SEE MORE" button to proceed to the next
            slice.
            You can freely proceed to the next segment to make more annotations.
          </p>
          <p>
            It is not mandatory to read the whole transcript. However, to
            qualify the task, you need to make
            <span class="font-weight-bold"> at least **five** annotations</span
            >. 
            We'll pay you $0.60 for each extra, valid annotation. 
          </p>
        </v-col>
        <v-col md="8" v-else-if="page === 5" key="page5">
          <p>
            <img class="screenshots" src="../assets/Screenshot3-1.gif" />
            If you added at least five annotations and finished reading the
            current segment, you can see a green "NEXT" button at the bottom of
            the page. If you left enough annotations as many as you want, click
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