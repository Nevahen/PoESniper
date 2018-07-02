<template>
    <div>
        <h1>Items: {{itemList.length}}</h1>
    <ul class="list-group w-100 text-primary">
    <li class="list-group-item bg-dark border-secondary text-white" v-for="(item, index) in itemList" :key="index">
        <div class="row">
            <div class="col-4">
                <div v-if="item.item.name" class="row col text-truncate">{{item.item.name}} <br/></div>
            <div v-if="item.item.typeLine" class="row col text-left">{{item.item.typeLine}} <br/></div>
            <div v-if="item.item.corrupted" class="row col"><span class="text-danger" >Corrupted</span>
            </div>
                <div class="row col justify-content-center mt-2 mb-2"><img :src="item.item.icon"></div>
            </div>
            <div class="col-4"><span v-for="(mod) in item.item.implicitMods">{{mod}}<br/></span>
            <span v-for="(mod) in item.item.explicitMods">{{mod}}<br/></span>
            </div>
            <div class="col-4">{{item.item.league}}  <button @click="removeListing(index)">Remove</button></div>
        </div>
        <div class="row">
            <div class="col-8">Account: {{item.listing.account.name}}</div>
            <div class="col-4">{{itemPrice(item)}} <button @click="messagePlayer(item)">PM</button></div>

        </div>
    </li>
    </ul>
    </div>
    </template>

<script>
export default {
  name: "item-list",
  methods: {
    addItem: function(event, item) {
      this.itemList.unshift(item);
    },
    itemPrice: function(item) {
      if (item.listing.price) {
        return `price: ${item.listing.price.amount} ${
          item.listing.price.currency
        }`;
      } else {
        return "not priced";
      }
    },
    removeListing: function(index) {
      console.log(index);
      this.itemList.splice(index, 1);
    },
    messagePlayer: function(item) {
      this.$electron.ipcRenderer.send("clipboard", item.listing.whisper);
    }
  },
  data() {
    return {
      itemList: []
    };
  },
  mounted: function() {
    this.$electron.ipcRenderer.on("newItem", this.addItem);
  }
};
</script>

<style>
button {
  padding: 3px;
  color: whitesmoke;
  font-weight: 700;
  border-radius: 5px;
  border: 3px solid #550000;
  background: #990000;
}
</style>