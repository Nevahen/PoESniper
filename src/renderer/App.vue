<template>
  <div id="app" style="height:100%">
    <div class="container-fluid bg-topbar" style="height:30px;">
      <div class="row draggable topbar">PoESniper</div>
    </div>

    <div class="container-fluid" style="height:calc(100% - 30px)">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "poesniper",
  methods: {
    closeApp() {
      let win = this.$electron.remote.getCurrentWindow();
      win.close();
    },
    minimize() {
      this.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }
  }
};
</script>
  
<style>
.draggable {
  -webkit-app-region: drag;
}

.bg-topbar {
  background: #111;
}
.topbar {
  padding: 3px;
  font-weight: 900;
}

* {
  user-select: none;
  cursor: default;
}

button,
a {
  cursor: pointer;
}

html,
body {
  height: 100%;
}
</style>
