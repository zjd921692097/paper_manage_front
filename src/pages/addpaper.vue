<template>  
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">登记论文</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >登记论文</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  
   <div id="box">  
     <span style="margin: 0em 0em 20em 0em">类型：</span>
     <el-select v-model="paper.typeid" placeholder="请选择" size="mini" >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      
      >
    </el-option>
  </el-select>
       <el-input v-model="paper.title" placeholder="请输入标题" size="small"  style="margin: 3em 10em 5em 15em;width:450px;height:20px;"></el-input>
     <vue-editor v-model="paper.content"></vue-editor>  
      <el-button type="primary" @click="onSubmit" style="margin: 1em 1em 0.5em 117em">保存</el-button>
   </div>  
</div>
 </template>  
  
 <script>  
   import { VueEditor } from 'vue2-editor'  
   import $ from 'jquery'
   export default {  
  
   components: {  
      VueEditor  
   },  
  
   data() {  
       return {  
           paper:{
                title:'',
                content: '' ,
                typeid:'' 
           },
           options: [],
           
       }  
     },
      methods:{
       onSubmit:function(){
           $.ajax({
          url: 'http://localhost:9090/addpaper',
          type: 'get',
          data: this.paper,
          dataType: "text",
          crossDomain: true,
  
          xhrFields: {
           withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
              
            data=JSON.parse(data)
            console.log(data)
            
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
            
        console.log("wo",this.paper.content);
       }  

   },
    created: function() {
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/getPaperTypes',
          type: 'post',
          dataType: "text",
          xhrFields: {
           withCredentials: true
           },
          crossDomain: true,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.options=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        console.log("1234",tableData)
  },
  

   }
 </script>  
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>