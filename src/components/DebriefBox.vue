<template>
  <v-card class="debriefing--box">
    <v-card-text>
      <v-simple-table>
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
              <td class="blue lighten-4">
                {{negNegByOthers}}
              </td>
              <td class="red lighten-4">
                {{negNeuByOthers}}
              </td>
              <td>
                {{negPosByOthers}}
              </td>
            </tr>
            <tr>
              <th>
                Not labeled 
              </th>
              <td class="lime lighten-4">
                {{neuNegByOthers}}
              </td>
              <td>
                {{neuNeuByOthers}}
              </td>
              <td>
                {{neuPosByOthers}}
              </td>
            </tr>
            <tr>
              <th>
                Labeled as <br /> positive influence
              </th>
              <td class="lime lighten-4">
                {{posNegByOthers}}
              </td>
              <td>
                {{posNeuByOthers}}
              </td>
              <td>
                {{posPosByOthers}}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
    neuNegByOthers: Number,
    neuNeuByOthers: Number,
    neuPosByOthers: Number,
    posNegByOthers: Number,
    posNeuByOthers: Number,
    posPosByOthers: Number
  }
}
</script>
<style lang="scss" scoped>
.debriefing--box {
  margin-top: 1em;
}
</style>