<template>
    <div class="row h-100">
        <div class="col-9 bg-dark">

          <item-list style="height:100%;overflow-y:scroll"></item-list>

        </div>
        <div class="col-3 bg-inverse">
            <div class="row"><div class="col-4 pl-1"> Searches</div>
            <div class="col-4 offset-4"> <a class="" href=""> Settings</a></div>
            
             </div>
            <div class="row" style="height:477px;overflow-y:hidden">
                   <search-list></search-list>
            </div>

            <div class="row bottom w-100"><button class="btn-lg w-100">New Search</button></div>
        </div>
    </div>


</template>

<script>
import SearchList from "./SearchList";
import ItemList from "./ItemList";

export default {
  name: "mainview",
  methods: {},
  components: {
    SearchList,
    ItemList
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

.btn-lg {
  border: none;
  border-radius: 0;
  height: 60px;
  background: #1cb11c;
  color: #006f00;
}

.heading {
  margin-bottom: 30px;
  text-align: center;
}

.text-center {
  text-align: center;
}

#login-container {
  position: absolute;
  bottom: 200px;
}

::-webkit-scrollbar {
  display: none;
}

.bottom {
  position: absolute;
  bottom: 0;
}

.warn {
  color: red;
}

#wrapper {
  margin: auto;
  margin-top: 20px;
  width: 200px;
}

.form-control {
  min-width: 200px;
  height: 30px;
  border: 1px solid green;
  margin-bottom: 5px;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  background: #222;
  color: white;
}
</style>
