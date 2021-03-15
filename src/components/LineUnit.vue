<template>
  <div>
    <v-list-item ripple @click="onLineClick" :disabled="disabled" 
      :class="`${highlightNeedsAttention && line.result.includes('ish') ? 'needs--attention' : ''}
        ${highlightUnannotated && line.result.startsWith('neuNeu') ? 'unannotated' : ''}`">
      <template>
        <v-list-item-avatar>
          <v-avatar
            :color="color">
            {{line.speaker}}
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content 
          :class="`${interactive? 'chat-bubble' : ''} 
            ${line.speaker}`">
          <v-list-item-subtitle>{{formattedStartTime}} - {{formattedEndTime}}</v-list-item-subtitle>
          {{line.text}}
        </v-list-item-content>
      </template>
    </v-list-item>
    <div v-if="(!line.result.startsWith('neu') || (disabled && (line.moments_positive + line.moments_negative) >= 2)) " class="feedback">
      <v-progress-linear
        rounded
        color="green"
        background-color="red"
        height="25"
        :value="line.moments_positive / (line.moments_positive + line.moments_negative) * 100"
      >
        <template v-slot:default>
          <span class="white--text text-caption">{{message[line.result]}}</span>
        </template>
      </v-progress-linear>
      <span class="text-body-2 black--text">
        
      </span>
    </div>
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
    disabled: Boolean,
    highlightUnannotated: Boolean,
    highlightNeedsAttention: Boolean
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
        posPosByOthers: `${countPos} / ${count} workers agreed with you that this line reinforces the psychological safety!`,
        posNegByOthers: `While ${countPos} / ${count} workers agreed with you, your contribution still gives a valuable insight!`,
        posNeuByOthers: `${countPos} / ${count} workers agreed with you. Your annotation would be critical to decide the final label!`,
        negPosByOthers: `While ${countNeg} / ${count} workers agreed with you, your contribution still gives a valuable insight!`,
        negNegByOthers: `${countNeg} out of ${count} workers agreed with you that this line harms the psychological safety!`,
        negNeuByOthers: `${countNeg} / ${count} workers agreed with you. Your annotation would be critical to decide the final label!`,
        neuPosByOthers: `Reinforce: ${countPos} / ${count}, Harm: ${countNeg} / ${count}`,
        neuPosishByOthers: `Reinforce: ${countPos} / ${count}, Harm: ${countNeg} / ${count}`,
        neuNegByOthers: `Reinforce: ${countPos} / ${count}, Harm: ${countNeg} / ${count}`,
        neuNegishByOthers: `Reinforce: ${countPos} / ${count}, Harm: ${countNeg} / ${count}`,
        neuNeuByOthers: `Reinforce: ${countPos} / ${count}, Harm: ${countNeg} / ${count}`
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

.chat-bubble {
  // border: 2px solid #666666;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  border-radius: 0.5em;
  // margin-bottom: 0.5em;
  padding-left: 1em;
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
  padding: 0.6em;
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

.feedback {
  padding: 0 1em 1em 4.5em;
}

@keyframes glowing {
    0% { box-shadow: 0 0 0px 8px rgba(255,255,0,.8); }
    30% { box-shadow: 0 0 10px 8px rgba(255,255,0,.8); }
    60% { box-shadow: 0 0 10px 8px rgba(255,255,0,.8); }
    100% { box-shadow: 0 0 0px 8px rgba(255,255,0,.8); }
}

.unannotated {
  border: 2px solid red;
}

.needs--attention {
  border: 2px solid blue;
}

.striped {
  background-image: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.25) 0%, 
  transparent 0, transparent 10%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 20%, 

  transparent 0, transparent 30%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 40%, 

  transparent 0, transparent 50%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 60%, 

  transparent 0, transparent 70%, 

  rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 80%, 
  transparent 0, transparent 90%,
   rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25)
  );
}
</style>