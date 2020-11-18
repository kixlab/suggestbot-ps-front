<template>
  <div>
    <v-row align-content="center" justify="center">
      <v-col md="3">
        <div >
          <img width="100%" src="../assets/agent.png">
        </div>
      </v-col>
      <v-col md="5">
        In this task, you are going to be an agent moderating a design meeting. 
        You'll see a chat log of a meeting for designing a new remote control. 
        If you discover any word that would make participants feel unsafe on speaking their thoughts freely, please label that line and leave how you would moderate the meeting.
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2" offset-md="10">
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