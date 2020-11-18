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
    }
  }
}
</script>