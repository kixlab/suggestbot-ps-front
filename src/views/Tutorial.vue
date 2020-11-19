<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-col md="8">
        
        <p>
          In this task, you will read a transcript from a meeting and annotate lines that would harm the **psychological safety** of the meeting. 
        </p>
        <p>
          In psychologcially safe environments, the meeting participants feel easy to speak up about what is on their minds, without fear of negative consequences of self-image, status or career. 
          In specific, you can simply find the lines that would make the meeting participants disagree with the statement <span class="red--text">"In this group, it is easy to speak up about what is on my mind."</span>
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot1.gif">
          The picture above shows the task interface. On the left side of the interface, you'll see the actual line-by-line transcript of the meeting. 
          On the right side, you can see the list of annotations you've made. 

          For each line in the meeting transcript, the colored circle denotes who was the speaker, and the text shows the actual words from each participant.
          When you find a line that would make the participants feel hard to speak up what were their own minds, click on it to start annotating.
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot2.gif">
          Upon clicking a line, the system will show a box to describe your annotation in detail. Please write what you would tell the speaker to improve the psychological safety of the group as a moderator, and click "SUBMIT" button. 
          If you made a mistake on selecting the line, you can click the red "DISCARD" button to cancel.  
        </p>

        <p>
          <img class="screenshots" src="../assets/Screenshot3.gif">       
          After you click the "Submit" button, you can see the list of annotations you added. 
        </p>
        <p>
          If you read the whole script, you can see a green "NEXT" button at the bottom of the page. Click it to continue.
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