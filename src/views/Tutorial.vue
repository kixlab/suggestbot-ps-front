<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-col md="8">
        
        <p>
          In this task, you will read a transcript from a meeting and annotate lines that would harm the **psychological safety** of the meeting. 
        </p>
        <p>
          In psychologcially safe environments, the meeting participants feel easy to speak up about what is on their minds, without fear of negative consequences of self-image, status or career. 
          <!-- In this group, it is easy to speak up about what is on my mind. -->
        </p>

        <p>
          On the next page, you'll see the meeting transcript as in the picture below.
          For each line, the colored circles denote who were the speaker, and the text will show the actual lines.
          When you feel the line would negatively affect the psychological safety of the group, click on it.
        </p>

        <p>
          Upon clicking a line, the system will show a box to describe why you thought the line would affect the psychological safety.

        </p>

        <p>
          After you click the "Submit" button, you can see the list of annotations you added.        
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

<style lang="sass" scoped>

</style>