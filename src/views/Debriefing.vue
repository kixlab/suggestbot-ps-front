<template>
  <v-row>
    <v-col md="12">
      <h3> 74% of your annotation has agreed with other annotators' labels. You can check it out in detail here. </h3>
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" class="scroll-box">
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <line-unit v-for="(l, idx) in lines" :key="idx"
              :line="l"
              :idx="idx"
              :class="getClass(line)"
              @line-click="openMomentBox">
            </line-unit>
          </v-list-item-group>
        </v-list>
      </div>
    </v-col>
    <v-col md="5">

      <moment-list
        :moments="moments">
      </moment-list>
      <debrief-box>
      </debrief-box>
      

      <!-- <moment-box
        v-show="isMomentBoxShown"
        @moment-saved="onMomentSaved"
        :moment="currentMoment"
        :currentLine="selectedLine"
        ></moment-box> -->
    </v-col>
    <v-col md="12" class="d-flex flex-row-reverse">
      <v-btn color="green" @click="onNextClick">NEXT</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
// import MomentBox from '../components/MomentBox.vue'
import DebriefBox from '../components/DebriefBox.vue'
import LineUnit from '../components/LineUnit.vue'
import MomentList from '../components/MomentList.vue'
import axios from 'axios'
export default {
  name: 'Annotate',
  components: {
    // MomentBox,
    LineUnit,
    MomentList,
    DebriefBox
  },
  data: function () {
    return {
      lines: [],
      moments: [],
      isMomentBoxShown: false,
      currentMoment: 0,
      selectedItem: undefined,
    }
  },
  computed: {
    selectedLine: function () {
      if (this.selectedItem !== undefined) {
        return this.lines[this.selectedItem]
      } else {
        return undefined
      }
    },
    ...mapState({
      token: state => state.token,
      dataset: state => state.dataset,
      taskType: state => state.taskType
    })
  },
  methods: {
    onNextClick: function () {
      this.$router.push('/Survey')
    },
    getClass: function (line) {
      // if (moments)
      if (line.moments > 5) {
        return 'lime lighten-4'
      } else if (line.moments > 1) {
        return 'pink lighten-4'
      } else {
        return ''
      }
    }
  },
  mounted: async function () {
    const dataset = this.dataset
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/logs/`, {
      event_name: 'StartDebriefing',
      status: this.taskType,
      payload: JSON.stringify({
        clientTime: new Date(),
        dataset: dataset
      })
    }, {
      headers: {
        Authorization: `Token ${this.token}`
      }
    })
    console.log(res)
    try {
      const lines = await axios.get(`${process.env.VUE_APP_API_URL}/lines/get_dataset/`, {
        params: {
          dataset: dataset
        }
      })
      const moments = await axios.get(`${process.env.VUE_APP_API_URL}/moments/?dataset_id=${dataset}`, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      this.lines = lines.data
      this.moments = moments.data

    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="sass" scoped>
.scroll-box 
  height: 80vh
  overflow-y: scroll

</style>
