<template>
  <v-card>
    <v-card-title>
      <span>Your Feedback</span>
      <v-spacer />
      <!-- <span>{{moments.length}} / 5</span> -->
    </v-card-title>
    <v-card-text class="scroll-box">
      <v-list dense>
        <moment-line v-for="m in moments" :key="m.pk"
          :moment="m"
          :revising="revising"
          :type="'moderating'"
          @remove-click="onRemoveClick">
        </moment-line>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import MomentLine from './MomentLine.vue'
export default {
  name: 'MomentList',
  props: {
    moments: Array,
    revising: Boolean
  },
  components: {
    MomentLine
  },
  methods: {
    onRemoveClick: function (id) {
      this.$emit('remove-click', id)
    }
  }
}
</script>

<style scoped lang="scss">
.scroll-box {
  height: 45vh;
  overflow-y: scroll;
}
</style>