<template>
  <v-row>
    <v-col md="12">
      <!-- <h3> Now, you'll see a replay of a chat stream of a collaboration meeting. Please label the line that harms psychological safety of the group and let us know how you'd intervene in such situations.</h3> -->
      <h3>Please carefully read this meeting transcript and annotate <span class="red--text">at least five lines</span> that would affect the psychological safety of the group. </h3>
      <!-- <h3 class="text-center red--text">"In this group, it is easy to speak up about what is on my mind." </h3> -->
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" @scroll="handleScroll" class="scroll-box">
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
        type="moderating"
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
      currentMoment: 0,
      selectedItem: undefined,
      currentTime: 300,
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
        return line.starttime <= this.currentTime
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
      if (this.lines[this.lines.length - 1].endtime < (this.currentTime + 450)) {
        this.currentTime  = this.lines[this.lines.length - 1].endtime + 100
      } else {
        this.currentTime += 300
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
