<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    ID: {{turkerId}}
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    turkerId: function () {
      return this.$store.state.turkerId.split('Token')[0]
    },
    ...mapState({
      username: state => state.username,
    })
  },

  data: () => ({
    //
  }),
};
</script>
