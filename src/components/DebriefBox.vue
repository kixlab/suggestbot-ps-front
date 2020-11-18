<template>
  <v-card class="debriefing--box">
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                
              </th>
              <th class="text-left">
                Labeled as <br> negative influence
              </th>
              <th class="text-left">
                Not labeled
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Labeled as <br>negative influence
                <br> by others</th>
              <td class="blue lighten-4">7</td>
              <td class="red lighten-4">3</td>
            </tr>
            <tr>
              <th>Not labeled <br> by others</th>
              <td class="lime lighten-4">4</td>
              <td>80</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.debriefing--box {
  margin-top: 1em;
}
</style>