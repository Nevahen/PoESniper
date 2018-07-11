<template>
    <div class="modal-bg" @click="$emit('close')">>
        <div class="modal-wrapper">
            <div class="modal-container" @click="stopPropagation">
                <h1>Add new search</h1>
                League:
                <select class="form-control">
                    <option>Incursion</option>
                    <option>Incursion HC</option>
                    <option>Standard</option>
                    <option>Hardcore</option>

                </select>
                Search term:
                <input type="text" id="term" v-model="searchItem.term" class="form-control">
                Search name:
                <input type="text" id="name" v-model="searchItem.name" class="form-control">
                <button class="btn btn-danger" @click="$emit('close')"> Cancel </button>
                <button class="btn btn-success float-right" @click="newSearch"> Add </button>

            </div>
        </div>
    </div>
    </template>

<script>
export default {
  name: "new-search-modal",
  methods: {
    stopPropagation: function(e) {
      e.stopPropagation();
    },
    newSearch: function() {
      if (this.searchItem.term && this.searchItem.name) {
        this.sendSearchToMain();
        this.$emit("close");
      } else {
        alert("woops");
      }
    },
    sendSearchToMain: function() {
      this.$electron.ipcRenderer.send("newSearch", this.searchItem);
    }
  },
  data() {
    return {
      searchItem: {}
    };
  }
};
</script>

<style scoped>
.modal-bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: table;
  z-index: 1000;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  z-index: 1001;
}

.modal-container {
  width: 400px;
  word-wrap: break-word;
  color: black;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>