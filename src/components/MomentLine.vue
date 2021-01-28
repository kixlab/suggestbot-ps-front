<template>
  <div>
    <v-list-item>
      <v-list-item-avatar>
        <v-avatar
          :color="color">
          {{moment.line.speaker}}
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-truncate">
          {{moment.direction}} - "{{moment.line.text}}"
           <!-- to {{moment.affected_speaker}} -->
        </v-list-item-title>
        <v-list-item-subtitle class="text-truncate">
          {{moment.reason}} - {{moment.possible_comment}}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="onRemoveClick">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: 'MomentLineUnit',
  props: {
    moment: Object,
    type: String
  },
  methods: {
    onRemoveClick: function () {
      this.$emit('remove-click', this.moment.id)
    }
  },
  computed: {
    truncatedText: function () {
      if (this.moment.line.text.length >= 30) {
        return this.moment.line.text.slice(0, 27) + '...'
      } else {
        return this.moment.line.text
      }
    },
    truncatedReason: function () {
      if (this.moment.reason.length >= 30) {
        return this.moment.reason.slice(0, 27) + '...'
      } else {
        return this.moment.reason
      }
    },
    color: function () {
      if (this.moment.line.speaker === 'A') {
        return 'blue'
      } else if (this.moment.line.speaker === 'B') {
        return 'pink'
      } else if (this.moment.line.speaker === 'C') {
        return 'green'
      } else if (this.moment.line.speaker === 'D') {
        return 'yellow'
      } else {
        return 'cyan'
      }
    }, 
    reasoning: function () {
      return this.type === 'reasoning'
    },
    moderating: function () {
      return this.type === 'moderating'
    },
    roletaking: function () {
      return this.type === 'roletaking'
    },
  }
}
</script>