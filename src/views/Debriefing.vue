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
              :class="`${lime.includes(idx) && 'lime lighten-4'} ${pink.includes(idx) && 'pink lighten-4'} ${blue.includes(idx) && 'blue lighten-4'}`"
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
      timerHandle: 0,
      currentTime: 0,
      startTime: new Date(),
      blue: [1, 4, 9, 13, 17, 25],
      lime: [3, 8, 16],
      pink: [2, 34, 54]


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
        const res = await axios.delete(`http://localhost:8000/moments/${id}/`, {
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
  mounted: async function () {
    try {
      const lines = await axios.get('http://localhost:8000/lines/get_dataset/', {
        params: {
          dataset: 'ES2016a'
        }
      })
      const moments = await axios.get(`http://localhost:8000/moments/?dataset_id=ES2016a`, {
        headers: {
          Authorization: `Token ${this.token}`
        }
      })
      this.$store.commit('setDataset', 'ES2016a')
      // console.log(lines)
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
