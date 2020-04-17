<template>
  <div id="control-area" class="d-flex flex-column">
    <p><strong>Execute Tasks</strong></p>
    <div class="d-flex flex-row justify-content-between">
      <button class="btn btn-secondary btn-md" @click="saveToFileClicked">
        Save to File
      </button>
      <button class="btn btn-secondary btn-md" @click="loadFromFileClicked">
        Load from File
      </button>
      <button class="btn btn-primary btn-md" @click="runClicked">
        <span>
          Run
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const { dialog } = require('electron').remote
const fs = require('fs')

export default {
  name: 'control-area',
  computed: {
    ...mapState('spinsys', ['euler', 'spins', 'interactions']),
    ...mapState('pulseseq', [
      'increment', 'emrs', 'sections', 'sequence'
    ]),
    ...mapState('SimSettings', [
      'sample', 'simulation', 'hardware'
    ])
  },
  methods: {
    prepareSpinsysOutput () {
      return '{}'
    },
    preparePulseseqOutput () {
      return '{}'
    },
    prepareSettingsOutput () {
      return '{}'
    },
    prepareOutput () {
      const spinsysStr = this.prepareSpinsysOutput()
      const pulseseqStr = this.preparePulseseqOutput()
      const settingsStr = this.prepareSettingsOutput()
      let result = {
        spinsys: spinsysStr,
        pulseseq: pulseseqStr,
        settings: settingsStr
      }
      return JSON.stringify(result, null, 2)
    },
    prepareInput () {

    },
    saveToFileClicked () {
      let content = this.prepareOutput()
      dialog.showSaveDialog({}
      ).then(result => {
        let filename = result.filePath
        if (filename === undefined) {
          // nothing created
          return
        }
        fs.writeFile(filename, content, (err) => {
          if (err) {
            console.log('an error ocurred with file creation ' + err.message)
          }
        })
      }).catch(err => {
        alert(err)
      })
    },
    loadFromFileClicked () {

    },
    runClicked () {

    }
  }
}
</script>

<style scoped>
  #control-area {
    margin: 2px;
    border: 1px solid #aaa;
  }
</style>
