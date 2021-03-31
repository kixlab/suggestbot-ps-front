<template>
  <v-card class="debriefing--box">
    <v-card-title>
      Summary of Your Feedback
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col md="6" class="text-center">
          <div class="text-h2">{{precision}}%</div>
          of your feedback agrees with the feedback of the majority.
        </v-col>
        <v-col md="6" class="text-center">
          <div class="text-h2">{{missed}} </div>
          lines annotated by the others are missing from your list.
        </v-col>
        <v-col md="6" :class="`text-center pointer ${highlightNeedsAttention ? 'needs--attention' : ''}`" @click="onNeedsAttentionClick"> 
          <div class="text-h2">{{needsAttention}}</div>
          lines need your feedback to make the final decision.
        </v-col>
        <v-col md="6" :class="`text-center pointer ${highlightUnannotated ? 'unannotated' : ''}`" @click="onUnannotatedClick">
          <div class="text-h2">{{unannotated}}</div>
          lines need the first feedback from you.
        </v-col>
      </v-row>

      <!-- <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">
                Labeled as <br />
                negative influence <br />
                by others
              </th>
              <th class="text-left">
                Not labeled <br />
                by others
              </th>
              <th class="text-left">
                Labeled as <br />
                positive influence <br />
                by others
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Labeled as <br />negative influence</th>
              <td :class="colors['negNegByOthers']">
                {{negNegByOthers}}
              </td>
              <td :class="colors['negNeuByOthers']">
                {{negNeuByOthers}}
              </td>
              <td :class="colors['negPosByOthers']">
                {{negPosByOthers}}
              </td>
            </tr>
            <tr>
              <th>
                Not labeled 
              </th>
              <td :class="colors['neuNegByOthers']">
                {{neuNegByOthers}}
              </td>
              <td :class="colors['neuNeuByOthers']">
                {{neuNeuByOthers}}
              </td>
              <td :class="colors['neuPosByOthers']">
                {{neuPosByOthers}}
              </td>
            </tr>
            <tr>
              <th>
                Labeled as <br /> positive influence
              </th>
              <td :class="colors['posNegByOthers']">
                {{posNegByOthers}}
              </td>
              <td :class="colors['posNeuByOthers']">
                {{posNeuByOthers}}
              </td>
              <td :class="colors['posPosByOthers']">
                {{posPosByOthers}}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DebriefingBox',
  props: {
    negNegByOthers: Number,
    negNeuByOthers: Number,
    negPosByOthers: Number,
    neuPosishByOthers: Number,
    neuNegByOthers: Number,
    neuNegishByOthers: Number,
    neuNeuByOthers: Number,
    neuPosByOthers: Number,
    posNegByOthers: Number,
    posNeuByOthers: Number,
    posPosByOthers: Number,
    highlightNeedsAttention: Boolean,
    highlightUnannotated: Boolean
  },
  computed: {
    precision: function () {
      const numerator = this.negNegByOthers + this.posPosByOthers
      const denominator = this.negNegByOthers + this.negNeuByOthers + this.negPosByOthers + this.posNegByOthers + this.posNeuByOthers + this.posPosByOthers
      
      return denominator === 0 ? 0 : (Math.floor(numerator / denominator * 100) )
    },
    recall: function () {
      const numerator = this.negNegByOthers + this.posPosByOthers
      const denominator = this.negNegByOthers + this.neuNegByOthers + this.posNegByOthers + this.negPosByOthers + this.neuPosByOthers + this.posPosByOthers

      return denominator === 0 ? 0 : Math.floor(numerator / denominator * 100) 
    },
    missed: function () {
      const numerator = this.negNegByOthers + this.posPosByOthers
      const denominator = this.negNegByOthers + this.neuNegByOthers + this.posNegByOthers + this.negPosByOthers + this.neuPosByOthers + this.posPosByOthers

      return (denominator - numerator)
    },
    needsAttention: function () {
      return this.neuPosishByOthers + this.neuNegishByOthers
    },
    unannotated: function () {
      return this.neuNeuByOthers
    },
    colors: function () {
      return {
        posPosByOthers: 'light-green lighten-4',
        posNegByOthers: 'light-green lighten-4',
        posNeuByOthers: 'light-green lighten-4',
        negPosByOthers: 'red lighten-4',
        negNegByOthers: 'red lighten-4',
        negNeuByOthers: 'red lighten-4',
        neuPosByOthers: '',
        neuNegByOthers: '',
        neuNeuByOthers: ''
      }
    }
  },
  methods: {
    onUnannotatedClick: function () {
      this.$emit('unannotated-click')
    },
    onNeedsAttentionClick: function () {
      this.$emit('needs-attention-click')
    }
  }
}
</script>
<style lang="scss" scoped>
.debriefing--box {
  margin-bottom: 1em;
}
.large--number {
  font-size: 5em;
  height: auto;
}
.pointer {
  cursor: pointer;
}

.unannotated {
  border: 1px solid red;
}

.needs--attention {
  border: 1px solid blue;
}
</style>