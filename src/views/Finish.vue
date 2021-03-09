<template>
  <v-row align-content="center" justify="center">
    <v-col md="8">
      Your code for the task is: {{rw}}

    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'finish',
  computed: {
    rw: function () {
      const res = this.$store.state.turkerId.split('Token')
      return res[1]
    }
    // rw: function () {
    //   const rw = randomWords({exactly: 4, maxLength: 5})
    //   return rw.toString()
    // }
  }
}
</script>

<style lang="sass" scoped>

</style>