<template>  
   <div id="app">  
       <el-input v-model="paper.title" placeholder="请输入标题"></el-input>
     <vue-editor v-model="paper.content"></vue-editor>  
      <el-button type="primary" @click="onSubmit">主要按钮</el-button>
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
                content: '<h1>Some initial content</h1>'  
           },
           
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
            self.tableData=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
            
        console.log("wo",this.paper.content);
       }  

   }
  

   }
 </script>  