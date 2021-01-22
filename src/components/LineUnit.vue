<template>
  <div>
    <v-list-item ripple @click="onLineClick">
      <v-list-item-avatar>
        <v-avatar
          :color="color">
          {{line.speaker}}
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>{{formattedStartTime}} - {{formattedEndTime}}</v-list-item-subtitle>
        {{line.text}}
      </v-list-item-content>
    </v-list-item>
    <v-divider>
    </v-divider>
  </div>
</template>

<script>
export default {
  name: 'LineUnit',
  props: {
    line: Object,
    idx: Number
  },
  methods: {
    onLineClick: function () {
      this.$emit('line-click', this.line.starttime, this.idx)
    }
  },
  computed: {
    color: function () {
      if (this.line.speaker === 'A') {
        return 'blue'
      } else if (this.line.speaker === 'B') {
        return 'pink'
      } else if (this.line.speaker === 'C') {
        return 'green'
      } else if (this.line.speaker === 'D') {
        return 'yellow'
      } else {
        return 'cyan'
      }
    },
    formattedStartTime: function () {
      const minutes = Math.floor(this.line.starttime / 60)
      const seconds = Math.round((this.line.starttime % 60) * 100 ) / 100

      return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
    },
    formattedEndTime: function () {
      const minutes = Math.floor(this.line.endtime / 60)
      const seconds = Math.round((this.line.endtime % 60) * 100 ) / 100

      return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
    }
  }
}
</script>