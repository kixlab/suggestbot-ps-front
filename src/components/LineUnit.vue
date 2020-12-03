<template>
  <div>
    <v-list-item ripple @click="onLineClick">
      <template>
        <v-list-item-avatar>
          <v-avatar
            :color="color">
            {{line.speaker}}
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          {{line.text}}
          <!-- <div v-if="slotProps.active">
            <v-divider></v-divider>
            <moment-box 
              :plain="false"
              @close-moment-box="closeMomentBox"
              @moment-saved="onMomentSaved"
              :moment="line.starttime"
              :currentLine="line">
            </moment-box>
          </div> -->
        </v-list-item-content>

      </template>
    </v-list-item>
    <v-divider>
    </v-divider>
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
    selected: Boolean
  },
  methods: {
    onLineClick: function () {
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
    }
  }
}
</script>