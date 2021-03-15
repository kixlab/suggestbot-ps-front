<template>
  <v-row>
    <v-col md="12">
      <h3> 
        Please choose <span class="red--text"> all lines (at least five)</span> 
        that would significantly reinforce or harm the psychological safety 
        and explain why you thought so.
      </h3>
      <v-progress-linear 
        height="20"
        striped dark
        :value="moments.length / 5 * 100">
        
        <template v-slot:default="{ value }">
          <span v-if="value < 100" class="white--text text--darken-3 font-weight-bold">{{Math.floor(value  * 5 / 100)}} / 5 annotations done!</span>
          <span v-else-if="value >= 100" class="white--text text--darken-3 font-weight-bold">{{Math.floor(value  * 5 / 100)}} annotations done!</span>

        </template>
      </v-progress-linear>
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" @scroll="handleScroll" class="scroll-box">
        <v-btn v-if="initialTime > 0" block @click="seePriorLines" class="primary">
          See previous lines
        </v-btn>
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <line-unit v-for="(l, idx) in filteredLines" :key="idx"
              :line="l"
              :idx="idx"
              @line-click="openMomentBox">
            </line-unit>
          </v-list-item-group>
        </v-list>
        <v-btn v-if="lines.length && lines[lines.length - 1].starttime > currentTime" block @click="seeMoreLines" class="primary">
          See more
        </v-btn>
      </div>
    </v-col>
    <v-col md="5">
      <moment-list
        :moments="moments"
        @remove-click="onRemoveClick">
      </moment-list>

      <moment-box
        :plain="true"
        v-if="isMomentBoxShown"
        @close-moment-box="closeMomentBox"
        @moment-saved="onMomentSaved"
        :moment="currentMoment"
        :currentLine="selectedLine"
        type="reasoning"
        ></moment-box>
    </v-col>
    <v-col md="12" class="d-flex flex-row-reverse" v-if="touchBottom && (moments.length >= 5)">
      <v-btn color="green" @click="onNextClick">NEXT</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import MomentBox from '../components/MomentBox.vue'
import LineUnit from '../components/LineUnit.vue'
import MomentList from '../components/MomentList.vue'
import axios from 'axios'
export default {
  name: 'Annotate',
  components: {
    MomentBox,
    LineUnit,
    MomentList
  },
  data: function () {
    return {
      lines: [],
      moments: [],
      isMomentBoxShown: false,
      initialTime: this.$store.state.initialTime || 0,
      currentMoment: 0,
      selectedItem: undefined,
      currentTime: this.$store.state.initialTime + this.$store.state.windowSize,
      touchBottom: false
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
      return this.lines.filter((line) => {
        return (line.starttime <= this.currentTime) && (line.starttime >= this.initialTime)
      })
    },
    ...mapState({
      token: state => state.token,
      dataset: state => state.dataset,
      taskType: state => state.taskType
    })
  },
  methods: {
    onMomentSaved: function (moment) {
      this.moments.push(moment)
      this.isMomentBoxShown = false
      this.currentMoment = 0
      this.selectedItem = undefined
    },
    handleScroll: function(el) {
      if ((el.srcElement.offsetHeight + el.srcElement.scrollTop) >= el.srcElement.scrollHeight) {
        this.touchBottom = true
      }
    },
    closeMomentBox: function () {
      this.currentMoment = 0
      this.isMomentBoxShown = false
      this.selectedItem = undefined
    },
    openMomentBox: function (starttime, idx) {
      if (this.selectedItem === undefined) {
        this.isMomentBoxShown = true
        this.currentMoment = starttime
      } else if (this.selectedItem !== idx) {
        this.currentMoment = starttime
        this.isMomentBoxShown = true
      } else {
        this.isMomentBoxShown = false
        this.currentMoment = 0
      }

      console.log('aaaa')
    },
    seeMoreLines: async function () {
      if (this.lines[this.lines.length - 1].endtime < (this.currentTime + this.$store.state.windowSize * 1.5)) {
        this.currentTime  = this.lines[this.lines.length - 1].endtime + 100
      } else {
        this.currentTime += this.$store.state.windowSize
      }
      // const condition = process.env.VUE_APP_COND
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
      this.touchBottom = false
    },
    seePriorLines: async function () {
      this.initialTime -= this.$store.state.windowSize
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
      // this.$store.commit('setDataset', dataset)
      // console.log(lines)
      this.lines = lines.data
      this.moments = moments.data

      if (this.lines[this.lines.length - 1].endtime < (this.initialTime + this.$store.state.windowSize * 1.5)) {
        this.currentTime  = this.lines[this.lines.length - 1].endtime + 100
      } else {
        this.currentTime = this.initialTime + this.$store.state.windowSize
      }

      // this.timerHandle = window.setInterval(function() {
      //   const now = new Date()
      //   this.currentTime += (now - this.startTime) / 1000
      //   this.startTime = now
      //   const container = this.$refs.scrollBox
      //   // console.log(container)
      //   container.scrollTop = container.scrollHeight

      // }.bind(this), 500)
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
