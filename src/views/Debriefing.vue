<template>
  <v-row>
    <v-col md="12">
      <h3> 74% of your annotation has agreed with other annotators' labels. You can check it out in detail here. </h3>
    </v-col>
    <v-col md="7">
      <div ref="scrollBox" class="scroll-box">
        <v-list>
          <v-list-item-group v-model="selectedItem">
            <line-unit v-for="(l, idx) in filteredLines" :key="idx"
              :line="l"
              :idx="idx"
              :class="getClass(l)">
            </line-unit>
          </v-list-item-group>
        </v-list>
      </div>
    </v-col>
    <v-col md="5">

      <moment-list
        :revising="true"
        :moments="moments">
      </moment-list>
      <debrief-box
        v-bind="debriefingBoxData">
      </debrief-box>
      
    </v-col>
    <v-col md="12" class="d-flex flex-row-reverse">

      <v-btn color="primary" @click="onNextClick">NEXT</v-btn>
      <v-btn color="success" @click="onAnnotateMoreClick" class="button-margin">Annotate More</v-btn>
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
  name: 'Debriefing',
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
      debriefingBoxData: {
        negNegByOthers: 0,
        negNeuByOthers: 0,
        negPosByOthers: 0,
        neuNegByOthers: 0,
        neuNeuByOthers: 0,
        neuPosByOthers: 0,
        posNegByOthers: 0,
        posNeuByOthers: 0,
        posPosByOthers: 0
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
      return this.lines.filter((l) => {
        return (l.starttime < this.$store.state.finishTime) && (l.starttime >= this.$store.state.initialTime)
      })
    },
    colors: function () {
      return {
        posPosByOthers: 'light-green lighten-4',
        posNegByOthers: 'red lighten-4',
        posNeuByOthers: '',
        negPosByOthers: 'light-green lighten-4',
        negNegByOthers: 'red lighten-4',
        negNeuByOthers: '',
        neuPosByOthers: 'light-green lighten-4',
        neuNegByOthers: 'red lighten-4',
        neuNeuByOthers: ''
      }
    },
    // debriefingBoxData: function () {
    //   const obj = {
    //     negNegByOthers: 0,
    //     negNeuByOthers: 0,
    //     negPosByOthers: 0,
    //     neuNegByOthers: 0,
    //     neuNeuByOthers: 0,
    //     neuPosByOthers: 0,
    //     posNegByOthers: 0,
    //     posNeuByOthers: 0,
    //     posPosByOthers: 0
    //   }
    //   this.filteredLines.forEach(line => {
    //     const myMoment = this.moments.find((m) => {
    //       return m.line.id === line.id
    //     })

    //     if (myMoment) {
    //       if (myMoment.direction === 'POSITIVE') {
    //         if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
    //           this.debriefingBoxData.posPosByOthers += 1
    //           line.posPosByOthers = true
    //         } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
    //           this.debriefingBoxData.posNegByOthers += 1            
    //           line.posNegByOthers = true
    //         } else {
    //           this.debriefingBoxData.posNeuByOthers += 1
    //           line.posNeuByOthers = true
    //         }
    //       } else {
    //         if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
    //           this.debriefingBoxData.negPosByOthers += 1  
    //           line.negPosByOthers = true
    //         } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
    //           this.debriefingBoxData.negNegByOthers += 1  
    //           line.negNegByOthers = true
    //         } else {
    //           this.debriefingBoxData.negNeuByOthers += 1
    //           line.negNeuByOthers = true
    //         }
    //       }
    //     } else {
    //       if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
    //         this.debriefingBoxData.neuPosByOthers += 1
    //         line.neuPosByOthers = true
    //       } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
    //         this.debriefingBoxData.neuNegByOthers += 1
    //         line.neuNegByOthers = true
    //       } else {
    //         this.debriefingBoxData.neuNeuByOthers += 1
    //         line.neuNeuByOthers = true
    //       }
    //     }
    //   })

    //   return obj
    // },
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
    onAnnotateMoreClick: function () {
      this.$store.commit('setInitialTime', this.$store.state.finishTime)
      this.$router.push('/Annotate')
    },
    getClass: function (line) {
      // if (line.posPosByOthers) {
      //   return 'light-green darken-2' // deep light-green
      // } else if (line.posNegByOthers) {
      //   return 'red darken-2 striped' // deep red stripe
      // } else if (line.posNeuByOthers) {
      //   return 'light-green lighten-2'
      // } else if (line.negPosByOthers) {
      //   return 'light-green darken-2 striped'
      // } else if (line.negNegByOthers) {
      //   return 'red darken-2' // deep red
      // } else if (line.negNeuByOthers) {
      //   return 'red lighten-2' // light red
      // } else if (line.neuPosByOthers) {
      //   return 'light-green darken-2 striped' // deep light-green stripe
      // } else if (line.neuNegByOthers) {
      //   return 'red darken-2 striped' // deep red stripe
      // } else {
      //   return ''
      // }
      if (line.posPosByOthers) {
        return this.colors['posPosByOthers'] // deep light-green
      } else if (line.posNegByOthers) {
        return this.colors['posNegByOthers'] // deep red stripe
      } else if (line.posNeuByOthers) {
        return this.colors['posNeuByOthers']
      } else if (line.negPosByOthers) {
        return this.colors['negPosByOthers']
      } else if (line.negNegByOthers) {
        return this.colors['negNegByOthers']
      } else if (line.negNeuByOthers) {
        return this.colors['negNeuByOthers']
      } else if (line.neuPosByOthers) {
        return this.colors['neuPosByOthers']
      } else if (line.neuNegByOthers) {
        return this.colors['neuNegByOthers']
      } else {
        return this.colors['neuNeuByOthers']
      }
    }
      // }
      // const myMoment = this.moments.find((m) => {
      //   return m.line.id === line.id
      // })

      // if (myMoment) {
      //   if (myMoment.direction === 'POSITIVE') {
      //     if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
      //       this.debriefingBoxData.posPosByOthers += 1
      //       return 'light-green darken-2' // deep light-green
      //     } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
      //       this.debriefingBoxData.posNegByOthers += 1
      //       return 'red darken-2 striped' // deep red stripe
      //     } else {
      //       this.debriefingBoxData.posNeuByOthers += 1
      //       return 'light-green lighten-2' // light light-green
      //     }
      //   } else {
      //     if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
      //       this.debriefingBoxData.negPosByOthers += 1            
      //       return 'light-green darken-2 striped' // deep light-green stripe
      //     } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
      //       this.debriefingBoxData.negNegByOthers += 1       
      //       return 'red darken-2' // deep red
      //     } else {
      //       this.debriefingBoxData.negNeuByOthers += 1

      //       return 'red lighten-2' // light red
      //     }
      //   }
      // } else {
      //   if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
      //     this.debriefingBoxData.neuPosByOthers += 1

      //     return 'light-green darken-2 striped' // deep light-green stripe
      //   } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
      //     this.debriefingBoxData.neuNegByOthers += 1
      //     return 'red darken-2 striped' // deep red stripe
      //   } else {
      //     this.debriefingBoxData.neuNeuByOthers += 1
      //     return '' // grey
      //   }
      // }
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
      const lines = await axios.get(`${process.env.VUE_APP_API_URL}/lines/get_dataset_counts/`, {
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
    this.lines.forEach(line => {
      if (line.starttime > this.$store.state.finishTime || line.starttime < this.$store.state.initialTime) {
        return
      }
      const myMoment = this.moments.find((m) => {
        return m.line.id === line.id
      })

      if (myMoment) {
        if (myMoment.direction === 'POSITIVE') {
          if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
            this.debriefingBoxData.posPosByOthers += 1
            line.posPosByOthers = true
          } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
            this.debriefingBoxData.posNegByOthers += 1            
            line.posNegByOthers = true
          } else {
            this.debriefingBoxData.posNeuByOthers += 1
            line.posNeuByOthers = true
          }
        } else {
          if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
            this.debriefingBoxData.negPosByOthers += 1  
            line.negPosByOthers = true
          } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
            this.debriefingBoxData.negNegByOthers += 1  
            line.negNegByOthers = true
          } else {
            this.debriefingBoxData.negNeuByOthers += 1
            line.negNeuByOthers = true
          }
        }
      } else {
        if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive >= 2 * line.moments_negative)) {
          this.debriefingBoxData.neuPosByOthers += 1
          line.neuPosByOthers = true
        } else if ((line.moments_positive + line.moments_negative > 5) && (line.moments_positive * 2 <= line.moments_negative)) {
          this.debriefingBoxData.neuNegByOthers += 1
          line.neuNegByOthers = true
        } else {
          this.debriefingBoxData.neuNeuByOthers += 1
          line.neuNeuByOthers = true
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.scroll-box {
  height: 80vh;
  overflow-y: scroll;
}

.striped {
  background-image: linear-gradient(135deg, 
  rgba(255, 255, 255, 0.25) 10%, 
  transparent 0, transparent 20%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 30%, 

  transparent 0, transparent 40%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 50%, 

  transparent 0, transparent 60%, 
    rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 70%, 

  transparent 0, transparent 80%, 

  rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 90%, 
  transparent 0, transparent);
}
.button-margin {
  margin-right: 1em;
}
</style>
