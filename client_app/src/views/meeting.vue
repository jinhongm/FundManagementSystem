<template>
    <div id="action-container" class="on-top">
      <input type="text" v-model="apiInput" placeholder="Enter message...">
      <button @click="checkConnectionStatus">Check Connection Status</button>
      <button @click="sayFromTextbox">Say from text box</button>
      <button @click="sendGesture">Send Gesture</button>
      <textarea id="apiOutput" rows="4" cols="50" readonly v-model="apiOutput"></textarea>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Meeting',
    setup() {
      const apiInput = ref('');
      const apiOutput = ref('');
  
      const checkConnectionStatus = () => { console.log('Checking connection status...'); };
      const sayFromTextbox = () => { console.log('Saying from textbox...'); };
      const sendGesture = () => { console.log('Sending gesture...'); };
  
      return {
        apiInput,
        apiOutput,
        checkConnectionStatus,
        sayFromTextbox,
        sendGesture
      };
    }
  };
  </script>
  
  <style scoped>
    .on-top {
      position: relative;
      z-index: 10;
      width: 320px;
      height: 240px;
    }
    #canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 60%;
      height: 100%;
      pointer-events: none;
    }
  </style>
  