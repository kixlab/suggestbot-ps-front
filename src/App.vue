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
  computed: mapState({
    username: state => state.username,
    turkerId: state => state.turkerId
  }),

  data: () => ({
    //
  }),
};
</script>
