<template>
  <div id="row">
        <h1 class="heading">PoESniper</h1>
        <div>
        Insert your POESESSID below <br/><br/>
        <input v-model="sessionID" class="form-control" id="POESESSID" type="text" placeholder="POESESSID"/><br/>
        <button class="btn" :disabled="loggingIn" @click="login()"><span v-if="loggingIn">Logging in</span><span v-else>Log in</span></button>
        <br/>
        <span class="warn text-center" v-if="failedLogin">Invalid or expired sessionID</span>
        </div>
  </div>
</template>

<script>

  export default {
    name: 'landing-page',
    methods: {
      login() {
        this.loggingIn = true;
        this.failedLogin = false;
        this.$electron.ipcRenderer.send('login', this.sessionID)
      },
      handleLoginResponse(event ,data){
        this.loggingIn = false
        if(data === false){
          this.failedLogin = true;
        }else{
          this.$router.push({path: 'main'})
        }
        console.log(data)
      }
    },
    data() {
      return {
        sessionID: "",
        failedLogin: false,
        loggingIn: false,
      }
    },
    mounted(){
      this.$electron.ipcRenderer.on('login', this.handleLoginResponse)
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .btn {
    min-width:200px;
    height: 30px;
    border:none;
    
  }

  .heading{
    margin-bottom:30px;
    text-align: center;
  }

  .text-center{
    text-align: center;
  }

  #login-container{
    position: absolute;
  }

  .warn{
    color:red;
  }

  #wrapper{  
    margin:auto;
    margin-top:20px;
    width: 200px;
  }

  .form-control {
    min-width: 200px;
    height: 30px;
    border: 1px solid green;
    margin-bottom:5px;
  }

  body { font-family: 'Source Sans Pro', sans-serif; background: #222; color:white; }

</style>
