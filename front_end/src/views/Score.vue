<template>
    <div class="boardview">
      <h3>기부 순위</h3>
      <table>
        <colgroup>
          <col style="width:25%">
          <col style="width:auto">
        </colgroup>
        <thead>
        <tr>
          <th>순위</th>
          <th>이름</th>
          <th>기부 횟수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="boardItem in transactionItem" v-bind:key="boardItem.title">

          <td>{{boardItem.rank}}</td>
            <td>{{boardItem.member.name}}</td>
          <td>{{boardItem.member.transactionCount}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    name : 'NFTsGet',
    data : function() {
      return {
        transactionItem: []
      };
    },
    mounted() {
      this.getBoardRead();
    },
    methods : {
      getBoardRead() {
        axios.defaults.headers.common['Access-Token'] = this.$store.state.loginStore.accessToken;
        axios.get("http://localhost:9000/transactions/rank").then((res) => {
          console.log(res);
          const array = [];
          for(const i of res.data.data){
            if(i.member.transactionCount == 0) continue
            array.push(i);
          }
          this.transactionItem = array;
          console.log(this.nftItem);
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
  .buttons > div > button {
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
  
  </style>