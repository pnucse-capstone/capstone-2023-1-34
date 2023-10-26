<template>
  <div class="boardview" id="profileBody">
    <h2>CHAINING PROFILE</h2>
    <h3>{{myItem.name}} / {{myItem.transactionCount}}번 기부</h3>
    <table>
      <colgroup>
        <col style="width:18.5%">
        <col style="width:auto">
      </colgroup>

      <div id="nft_list" v-for="Item in nftItem" v-bind:key="Item.title">
        <div ><img id="nft_img" :src="Item.media"></div>
        <div id="nft_title">{{Item.title}}</div>
        <div id="nft_desc">{{Item.description}}</div>
      </div>

    </table>
  </div>

  <button class="button" v-on:click="value = 'https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl='+getQR+'&choe=UTF-8'">QR생성</button>
  <button class="button" v-on:click="screenshot($event)">이미지로 저장</button>
  <img :src="value" v-if="this.value.length > 1">

</template>
<script>
import axios from "axios";
import html2canvas from 'html2canvas';
export default {
  name : 'NFTsGet',
  data : function() {
    return {
      boardItem : {},
      nftItem: [],
      myItem: [],
      value: ''
    };
  },
  mounted() {
    this.getBoardRead();
  },
  methods : {
    getBoardRead() {
      axios.defaults.headers.common['Access-Token'] = this.$store.state.loginStore.accessToken;
      axios.get("http://localhost:9000/blockchain/nfts" ,{
        headers: {
          'Authorization' : `Bearer ${this.$store.state.accessToken}`
        }
      }).then((res) => {
        console.log(res);
        this.boardItem = res.data.data;
        this.nftItem = this.boardItem.ownedNfts;

        console.log(this.nftItem);
      }).catch((err) => {
        console.log(err);
      });
      axios.get("http://localhost:9000/members/me").then((res)=>{
        console.log(res);
        this.myItem = res.data.data;

      }).catch((err) => {
        console.log(err);
      });

    },
    screenshot(){
      html2canvas(document.getElementById("profileBody"), {
        "logging": true, //Enable log (use Web Console for get Errors and Warnings)
        "useCORS": false,
      }).then(canvas => {

        const link = document.createElement('a')
        link.download = 'ChainingProfile'
        link.href = canvas.toDataURL()
        document.body.appendChild(link)
        link.click()
    });

    axios.get("http://localhost:9000/members/me").then((res)=>{
        console.log(res);
        this.myItem = res.data.data;
      }).catch((err) => {
        console.log(err);
      });

    }
  }
};
</script>

<style scoped>
.boardview {
  width: 800px;
  margin: 20px auto;
}

.boardview table {
  width: 100%;
  border-top: 2px solid #1d4281;
  border-spacing: 0;
}

.boardview table th {
  padding: 8px 10px 10px 10px;
  vertical-align: middle;
  color: #1d4281;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
}

.boardview table td {
  padding: 7px 20px 9px 20px;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  line-heighT: 150%;
}
.boardview table tr .picture{
  height:300px
}

.boardview table td.title {
  font-weight: bold;
}

.buttons {
  position: relative;
  height: 32px;
  margin-top: 20px;
}

.buttons > div.right {
  position: absolute;
  height: 32px;
  right: 0;
}

.buttons > div.left {
  position: absolute;
  height: 32px;
  left: 0;
}

.buttons > div.right > .button.blue {
  display: inline-block;
  overflow: visible;
  cursor: pointer;
  width: 125px;
  height: 32px;
  margin: 0 2px;
  padding: 0 15px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #dfdfdf;
  background: #fff;
  border-radius: 10px;
}
button {
  overflow: visible;
  cursor: pointer;
  min-width: 125px;
  height: 32px;
  margin: 0 2px;
  padding: 0 15px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #dfdfdf;
  background: #fff;
  border-radius: 10px;
}


#nft_list{
  float: left;
}

#nft_list > div{
  margin: 10px;
}

h2{
  font-family: fantasy;
}
h3{
  text-align: left;
}
#nft_title{
  font-size: large;
  font-weight: bold;
}

#nft_img{
  width: 150px;
  height: 150px;
}
</style>