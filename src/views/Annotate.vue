<template>
  <v-row>
    <v-col md="12">
      <h3> 
        Please choose <span class="red--text"> all lines (at least five)</span> 
        that would significantly boost or harm the psychological safety 
        and tell us how you'd give feedback to the speaker.
      </h3>
      <v-progress-linear 
        height="20"
        striped dark
        :value="moments.length / 5 * 100">
        
        <template v-slot:default="{ value }">
          <span v-if="value < 100" class="white--text text--darken-3 font-weight-bold">{{value  * 5 / 100}} / 5 annotations done!</span>
          <span v-else-if="value >= 100" class="white--text text--darken-3 font-weight-bold">{{value  * 5 / 100}} annotations done!</span>
        </template>
      </v-progress-linear>
      <!-- <h3>Please carefully read this meeting transcript and annotate the lines that negatively affected the psychological safety of the group. </h3> -->
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" class="scroll-box">
        <v-btn v-if="initialTime > 0" block @click="seePriorLines" class="primary">
          See previous lines
        </v-btn>
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <line-unit v-for="(l, idx) in filteredLines" :key="idx"
              :interactive="true"
              :line="l"
              :idx="idx"
              :selected="idx === selectedItem"
              @close-moment-box="closeMomentBox"
              @moment-saved="onMomentSaved"
              @line-click="openMomentBox">
            </line-unit>
          </v-list-item-group>
        </v-list>
        <v-btn v-if="seeMore && lines[lines.length - 1].starttime > currentTime * 2" block @click="seeMoreLines" class="primary">
          See more
        </v-btn>
      </div>
    </v-col>
    <v-col md="5">

      <moment-list
        :moments="moments"
        @remove-click="onRemoveClick">
      </moment-list>

      <!-- <moment-box
        :plain="true"
        v-if="isMomentBoxShown"
        @close-moment-box="closeMomentBox"
        @moment-saved="onMomentSaved"
        :moment="currentMoment"
        :currentLine="selectedLine"
        type="reasoning"
        ></moment-box> -->
    </v-col>
    <v-col md="12" class="d-flex flex-row-reverse" v-if="(seeMore || filteredLines.length === lines.length) && (moments.length >= 5)">
      <v-btn color="green" @click="onNextClick">NEXT</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
// import MomentBox from '../components/MomentBox.vue'
import LineUnit from '../components/LineUnit.vue'
import MomentList from '../components/MomentList.vue'
import axios from 'axios'
export default {
  name: 'Annotate',
  components: {
    // MomentBox,
    LineUnit,
    MomentList
  },
  data: function () {
    return {
      lines: [],
      moments: [],
      isMomentBoxShown: false,
      initialTime: 0,
      currentMoment: 0,
      selectedItem: undefined,
      timerHandle: 0,
      currentTime: 0,
      startTime: new Date(),
      touchBottom: false,
      seeMore: false
    }
  },
  watch: {
    currentTime: function (newTime) {
      if (newTime > 1 && (newTime - Math.floor(newTime) > 0.5) && (Math.floor(newTime) % (this.$store.state.windowSize / 2) === 0)) {
        this.pauseTimer()
        this.seeMore = true
        this.$nextTick(() => {
          const container = this.$refs.scrollBox
          // console.log(container)
          container.scrollTop = container.scrollHeight
        })
      }
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
    filteredLines: function () {
      return this.lines.filter(l => {
        return (l.starttime <= this.currentTime * 2) && (this.initialTime <= l.starttime)
      })
    },
    positives: function () {
      return this.moments.filter(m => {
        return m.direction === 'POSITIVE'
      }).length
    },
    negatives: function () {
      return this.moments.filter(m => {
        return m.direction === 'NEGATIVE'
      }).length
    },
    ...mapState({
      token: state => state.token,
      dataset: state => state.dataset,
      taskType: state => state.taskType
    })
  },
  methods: {
    startTimer: function() {
      if (this.seeMore) {
        return
      }
      this.startTime = new Date()
      this.timerHandle = window.setInterval(function() {
        const now = new Date()
        this.currentTime += (now - this.startTime) / 1000
        const container = this.$refs.scrollBox
        // console.log(container)
        container.scrollTop = container.scrollHeight
        this.startTime = now

      }.bind(this), 500)
    },
    pauseTimer: function () {
      clearInterval(this.timerHandle)
    },
    seeMoreLines: async function () {
      this.seeMore = false
      this.startTimer()
      const dataset = this.dataset
      axios.post(`${process.env.VUE_APP_API_URL}/logs/`, {
        event_name: 'SeeMore',
        status: this.taskType,
        payload: JSON.stringify({
          clientTime: new Date(),
          dataset: dataset,
          currentTime: this.currentTime
        })
      }, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
    },
    seePriorLines: async function () {
      this.initialTime -= 300 
      const dataset = this.dataset
      axios.post(`${process.env.VUE_APP_API_URL}/logs/`, {
        event_name: 'SeePriorLines',
        status: this.taskType,
        payload: JSON.stringify({
          clientTime: new Date(),
          dataset: dataset,
          currentTime: this.currentTime
        })
      }, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
    },
    onMomentSaved: function (moment) {
      this.moments.push(moment)
      this.isMomentBoxShown = false
      this.currentMoment = 0
      this.selectedItem = undefined
      this.startTimer()
    },
    closeMomentBox: function () {
      this.currentMoment = 0
      this.isMomentBoxShown = false
      this.selectedItem = undefined
      this.startTimer()
    },
    openMomentBox: function (starttime, idx) {
      this.pauseTimer()
      if (this.selectedItem === undefined) {
        this.isMomentBoxShown = true
        this.currentMoment = starttime
        console.log(idx, this.filteredLines.length)
        this.$nextTick(() => {
          this.$nextTick(() => {
            if (idx >= (this.filteredLines.length - 3)) {
              const container = this.$refs.scrollBox
              // console.log(container)
              container.scrollTop = container.scrollHeight
            }
          })
        })
      } else if (this.selectedItem !== idx) {
        this.currentMoment = starttime
        this.isMomentBoxShown = true
        this.$nextTick(() => {
          if (idx >= (this.filteredLines.length - 3)) {
            const container = this.$refs.scrollBox
            // console.log(container)
            container.scrollTop = container.scrollHeight
          }
        })
        
      } else {
        this.startTimer()
        this.isMomentBoxShown = false
        this.currentMoment = 0
      }
      // this.$refs.momentBox.scrollIntoView()
    },
    onNextClick: async function () {
      const res = await axios.post(`${process.env.VUE_APP_API_URL}/logs/`, {
        event_name: 'EndTask',
        status: this.taskType,
        payload: JSON.stringify({
          clientTime: new Date(),
          dataset: this.dataset
        })
      }, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      console.log(res)
      this.$router.push('/Survey')
    },
    onRemoveClick: async function (id) {
      const momentIdx = this.moments.findIndex((o) => {
        return id === o.id
      })
      try {
        const res = await axios.delete(`${process.env.VUE_APP_API_URL}/moments/${id}/`, {
          headers: {
            Authorization: `Token ${this.token}`
          }
        })
        console.log(res)
        this.moments.splice(momentIdx, 1)

      } catch (err) {
        console.log(err)
      }
    }
  },
  beforeDestroy: function () {
    window.clearInterval(this.timerHandle)
  },
  mounted: async function () {
    const dataset = this.dataset
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/logs/`, {
      event_name: 'StartTask',
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
      // this.$store.commit('setDataset', 'ES2016a')
      // console.log(lines)
      this.lines = lines.data
      this.moments = moments.data
      this.startTimer()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="sass" scoped>
.scroll-box 
  height: 70vh
  overflow-y: scroll

</style>
