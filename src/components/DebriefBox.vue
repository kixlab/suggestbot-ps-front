<template>
  <v-card class="debriefing--box">
    <v-card-text>
      Among your annotations, {{precision}}% agreed with others' annotations.

      We need your help on {{needsAttention}} lines to decide the final annnotation.
      There are {{missed}} annotations you missed while others have agreed on.
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
    posPosByOthers: Number
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
  }
}
</script>
<style lang="scss" scoped>
.debriefing--box {
  margin-top: 1em;
}
</style>