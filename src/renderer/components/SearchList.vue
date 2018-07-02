<template>
    <ul class="list-group w-100 text-primary">
    <li class="list-group-item border" v-for="(item, Sindex) in searchList" :key="Sindex">
        <div class="row">
            <div class="col-8">{{item.name}}</div>
            <div class="col-4">{{item.league}}</div>
        </div>
        <div class="row"> 
            <div class="col-10"></div>
            <div class="col-2"><input type="checkbox" :checked="item.active" @change="toggleSearch(Sindex)"/></div>
        </div>
        
    </li>
    </ul>
    </template>

<script>
export default {
  name: "search-list",
  methods: {
    updateList: function(event, data) {
      this.searchList = data;
      console.log(data);
    },
    toggleSearch(i) {
      console.log(i);
      this.searchList[i].active = !this.searchList[i].active;
      this.$electron.ipcRenderer.send("toggleSearch", {
        index: i,
        active: this.searchList[i].active
      });
    }
  },
  data() {
    return {
      searchList: []
    };
  },
  mounted: function() {
    this.$electron.ipcRenderer.send("getSearchList");
    this.$electron.ipcRenderer.on("searchList", this.updateList);
  }
};
</script>

<style>
.list-group-item {
  color: white;
  background: transparent;
  border-radius: 0px;
}

.list-group-item:first-child,
.list-group-item:last-child {
  border-radius: 0px;
}
</style>