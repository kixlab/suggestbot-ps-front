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
        <v-list-item-content >
          <div :class="`${interactive? 'chat-bubble' : ''} ${line.speaker}`">
            <v-list-item-subtitle>{{formattedStartTime}} - {{formattedEndTime}}</v-list-item-subtitle>
            {{line.text}}
          </div>
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
    <!-- <v-divider>
    </v-divider> -->
    <div v-if="interactive">
      <v-row v-if="selected">
        <v-col md="9" offset-md="1">
          <moment-box 
            :plain="false"
            :type="'moderating'"
            @close-moment-box="onCloseMomentBox"
            @moment-saved="onMomentSaved"
            :moment="line.starttime"
            :currentLine="line">
          </moment-box>
        </v-col>
        <v-col md="2">
          <img width="100%" src="../assets/agent.png">
        </v-col>
      </v-row>
      <!-- <v-divider v-if="selected">
      </v-divider> -->
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
<style lang="scss" scoped>
.v-list-item:hover {
  .chat-bubble.A::before{
    background-color: #b4d6f2;
  }
  .chat-bubble.B::before {
    background-color:#efb4c9;
  }
  .chat-bubble.C::before{
    background-color: #c1dec2;
  }
  .chat-bubble.D::before {
    background-color: #f6f0bd;
  }
}
.v-list-item--active {
  &, &:hover{
  .chat-bubble.A::before {
    background-color: #A7C7E1;
  }
  .chat-bubble.B::before {
    background-color:#dea7ba;
  }
  .chat-bubble.C::before {
    background-color: #b3ceb4;
  }
  .chat-bubble.D::before {
    background-color: #e4dfaf;
  }
  }

}

.v-list-item__content {
  padding: 0;
}

.chat-bubble {
  // border: 2px solid #666666;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  border-radius: 0.5em;
  margin-top: 0.5em;
  padding-left: 1.5em;
  // background-color:;
  // box-shadow: 0 0 6px #B2B2B2;
  &.A {
    background-color: #BBDEFB;
    &::before {
      background-color: #BBDEFB;
    }
  }
  &.B {
    background-color:#F8BBD0;
    &::before {
      background-color:#F8BBD0;
    }
  }
  &.C {
    background-color: #C8E6C9;
    &::before {
      background-color:#C8E6C9;
    }
  }  
  &.D {
    background-color: #FFF9C4;
    &::before {
      background-color: #FFF9C4;
    }
  }
}
.chat-bubble::before {
  display: block;
  content: ' ';
  height: 0em;
  width: 0em;
  padding: 0.7em;
  position: absolute;
  left: 4em;
  // background-color: ;
  // border: 2px solid #666666;
  transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  // box-shadow: 2px -2px 2px 0 #B2B2B2;

}
</style>