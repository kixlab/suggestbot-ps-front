<template>
  <div>
    <v-list-item ripple @click="onLineClick" :disabled="disabled">
      <template>
        <v-list-item-avatar>
          <v-avatar
            :color="color">
            {{line.speaker}}
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-progress-linear
            v-if="(line.moments_positive + line.moments_negative) >= 5"
            color="green"
            background-color="red"
            :value="line.moments_positive / (line.moments_positive + line.moments_negative) * 100"
        ></v-progress-linear>
          <v-list-item-subtitle>{{formattedStartTime}} - {{formattedEndTime}}</v-list-item-subtitle>
          {{line.text}}
        </v-list-item-content>

      </template>
    </v-list-item>
    <v-divider>
    </v-divider>
    <div v-if="interactive">
      <moment-box v-if="selected"
        :plain="false"
        :type="'moderating'"
        @close-moment-box="onCloseMomentBox"
        @moment-saved="onMomentSaved"
        :moment="line.starttime"
        :currentLine="line">
      </moment-box>
      <v-divider v-if="selected">
      </v-divider>
    </div>
  </div>
</template>

<script>
import MomentBox from './MomentBox.vue'
export default {
  name: 'LineUnit',
  components: {
    MomentBox
  },
  props: {
    line: Object,
    idx: Number,
    selected: Boolean,
    interactive: Boolean,
    disabled: Boolean
  },
  methods: {
    onLineClick: function () {
      // if (this.disabled) {
      //   return
      // }
      this.$emit('line-click', this.line.starttime, this.idx)
    },
    onMomentSaved: function (data) {
      this.$emit('moment-saved', data)
    },
    onCloseMomentBox: function () {
      this.$emit('close-moment-box')
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