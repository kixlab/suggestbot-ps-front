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
          <v-list-item-subtitle>{{formattedStartTime}} - {{formattedEndTime}}</v-list-item-subtitle>
          {{line.text}}
          <template v-if="!line.result.startsWith('neu')">
            <v-divider/>
            <v-progress-linear
              v-if="(line.moments_positive + line.moments_negative) >= 5"
              color="green"
              background-color="red"
              :value="line.moments_positive / (line.moments_positive + line.moments_negative) * 100"
            ></v-progress-linear>
            <span class="text-body-2 black--text">
              {{message[line.result]}}
            </span>
          </template>
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
    },
    message: function () {
                    // {{line.moments_positive}} / {{line.moments_positive + line.moments_negative}} fellow workers agreed with your annotation!
      const countPos = this.line.moments_positive
      const countNeg = this.line.moments_negative
      const count = countPos + countNeg
      return {
        posPosByOthers: `${countPos} / ${count} workers agreed with you!`,
        posNegByOthers: `While ${countPos} / ${count} workers agreed with you, your contribution would give valuable insight!`,
        posNeuByOthers: `${countPos} / ${count} workers agreed with you. Your annotation would be valuable for the final decision!`,
        negPosByOthers: `While ${countPos} / ${count} workers agreed with you, your contribution would give valuable insight!`,
        negNegByOthers: `${countNeg} out of ${count} workers agreed with you!`,
        negNeuByOthers: `${countNeg} / ${count} workers agreed with you. Your annotation would be valuable for the final decision!`,
        neuPosByOthers: '',
        neuNegByOthers: '',
        neuNeuByOthers: ''
      }
    }
  }
}
</script>