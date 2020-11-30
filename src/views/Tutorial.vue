<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-col md="8">
        
        <p>
          In this task, you will read a transcript from a meeting and annotate lines that would harm the <span class="font-weight-bold">**psychological safety**</span> of the meeting. In psychologcially safe environments, the meeting participants feel easy to speak up about what is on their minds, without fear of negative consequences of self-image, status or career. 
        </p>
        <p>
          In specific, you will find the lines that would make the meeting participants agree or disagree with the statement <span class="red--text">"In this group, it is easy to speak up about what is on my mind."</span>
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot1-1.gif">
          The picture above shows the task interface. On the left side of the interface, you'll see the actual line-by-line transcript of the meeting. 
          On the right side, you can see the list of annotations you've made. 

          For each line in the meeting transcript, the colored circle denotes who was the speaker, and the text shows the actual words from each participant.
          When you find a line that would make the participants either feel easier or harder to speak up about their own minds, click on it to start annotating.
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot2-2.gif">
          Upon clicking a line, the system will show a box to describe your annotation in detail. 
          First, please annotate whether the meeting participants would feel easier or harder to speak up about their minds. 
          Then, please write why you thought so on the psychological safety of the group, and click "SUBMIT" button.
          <!-- what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button.  -->
          If you made a mistake on selecting the line, you can click the red "DISCARD" button to cancel.  
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot3-1.gif">       
          After you click the "Submit" button, you can see the list of annotations you added. 
        </p>
        <p>
          If you read the whole script and added more than <span class="font-weight-bold">**five**</span> annotations, you can see a green "NEXT" button at the bottom of the page. Click it to continue.
        </p>

      </v-col>
    </v-row>
    <v-row align-content="right" justify="end">
      <v-col md="2">
        <v-btn
          primary
          @click="onNextClick"
          >
          NEXT
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'tutorial',
  methods: {
    onNextClick: function () {
      this.$router.push('AnnotatePlain')
    }
  }
  
}
</script>

<style lang="scss" scoped>
.screenshots {
  width: 100%;
}
</style>