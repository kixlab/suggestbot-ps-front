<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-slide-x-transition :hide-on-leave="true">
        <v-col md="8" v-if="page === 1" key="page1">
          <p>
            In this task, you will read a transcript from a meeting and
            annotate lines that would reinforce or harm the
            <span class="font-weight-bold">**psychological safety**</span> of
            the meeting. 
            
            In psychologcially safe environments, the meeting
            participants feel easy to speak up about what is on their minds,
            without fear of negative consequences of self-image, status or
            career.
          </p>
          <p>
            Following are some (not exhausative) behaviors that may affect the psychological safety:
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
            In specific, you will find the lines that would make the meeting
            participants agree or disagree with the statement
            <span class="red--text"
              >"In this group, it is easy to speak up about what is on my
              mind."</span
            >
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 2" key="page2">
          <p>
            <img class="screenshots" src="../assets/Screenshot1-2.gif" />
            The picture above shows the task interface. On the left side of
            the interface, you'll see the actual line-by-line transcript of
            the meeting. The script may contain a single word when the audio
            of the participants were mixed. 
            
            On the right side, you can see the list of annotations you've made. For each line in the meeting
            transcript, the colored circle denotes who was the speaker, and
            the text shows the actual words from each participant. When you
            find a line that would make the participants either feel easier or
            harder to speak up about their own minds, click on it to start
            annotating.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 3" key="page3">
          <p>
            <img class="screenshots" src="../assets/Screenshot2-3.gif" />
            Upon clicking a line, the system will show a box to describe your
            annotation in detail. First, please annotate whether the selected line would reinforce or harm the psychological safety of the meeting.
            <!-- meeting participants would feel easier or harder to speak up about their minds. -->
            Then, please choose or write why you thought so on the psychological
            safety of the group, and click "SUBMIT" button.
            
            <!-- what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button.  -->
            If you made a mistake on selecting the line, you can click the red
            "DISCARD" button to cancel. After you click the "Submit" button,
            you can see the list of annotations you added.
          </p>
        </v-col>

        <v-col md="8" v-else-if="page === 4" key="page4">
          <p>
            <img class="screenshots" src="../assets/Screenshot4.gif" />
            The script is divided into several segments. Each segment presents
            transcript from a five-minute slice of the meeting. When you
            reached the end of the segment you can click "SEE MORE" button to
            proceed to the next segment.
          </p>
        </v-col>
        <v-col md="8" v-else-if="page === 5" key="page5">
          <p>
            It is not mandatory to read the whole transcript. However, to
            qualify the task, you need to make
            <span class="font-weight-bold">
              at least **five** annotations</span
            >. You can freely proceed to the next segment to make annotations.
          </p>
          <p>
            <img class="screenshots" src="../assets/Screenshot3-1.gif" />
            If you added more than five annotations and finished reading the
            current segment, you can see a green "NEXT" button at the bottom
            of the page. If you left enough annotations as many as you want,
            click it to continue.
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