<template>
  <v-row>
    <v-col md="12">
      <h3> Now, you'll see a replay of a chat stream of a collaboration meeting. Please label the line that harms psychological safety of the group and let us know how you'd intervene in such situations.</h3>
      <!-- <h3>Please carefully read this meeting transcript and annotate the lines that negatively affected the psychological safety of the group. </h3> -->
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" class="scroll-box">
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <line-unit v-for="(l, idx) in lines" :key="idx"
              v-show="l.starttime <= currentTime"
              :line="l"
              :idx="idx"
              @line-click="openMomentBox">
            </line-unit>
          </v-list-item-group>
        </v-list>
      </div>
    </v-col>
    <v-col md="5">

      <moment-list
        :moments="moments"
        @remove-click="onRemoveClick">
      </moment-list>

      <moment-box
        :plain="false"
        v-show="isMomentBoxShown"
        @moment-saved="onMomentSaved"
        :moment="currentMoment"
        :currentLine="selectedLine"
        ></moment-box>
    </v-col>
    <v-col md="12" class="d-flex flex-row-reverse">
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
      timerHandle: 0,
      currentTime: 0,
      startTime: new Date()
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
      token: state => state.token
    })
  },
  methods: {
    onMomentSaved: function (moment) {
      this.moments.push(moment)
      this.isMomentBoxShown = false
      this.currentMoment = 0
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
    onNextClick: function () {
      this.$router.push('/survey')
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
    try {
      const lines = await axios.get(`${process.env.VUE_APP_API_URL}/lines/get_dataset/`, {
        params: {
          dataset: 'ES2016a'
        }
      })
      const moments = await axios.get(`${process.env.VUE_APP_API_URL}/moments/?dataset_id=ES2016a`, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      this.$store.commit('setDataset', 'ES2016a')
      // console.log(lines)
      this.lines = lines.data
      this.moments = moments.data
      this.timerHandle = window.setInterval(function() {
        const now = new Date()
        this.currentTime += (now - this.startTime) / 1000
        this.startTime = now
        const container = this.$refs.scrollBox
        // console.log(container)
        container.scrollTop = container.scrollHeight

      }.bind(this), 500)
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
