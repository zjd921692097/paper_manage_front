<template>
<div>
   
  <div><el-input style="margin: 2em 10em 0em 35em;width:400px;" placeholder="请输入内容"  v-model="mypaper.title"  :disabled="true"></el-input></div>
  
  <div>
    <el-button type="primary" icon="el-icon-edit" circle @click="resetpp"  style="margin: 0em 3em 1em 1em"></el-button>
    <span >阅读数：{{mypaper.readNum}}</span>
    <span style="margin: 0em 0em 0em 20em">类型：{{mypaper.typeName}}</span>
    <span style="margin: 0em 0em 0em 20em">创建时间：{{mypaper.createdtime}}</span>
    <span style="margin: 0em 0em 0em 20em">更新时间：{{mypaper.updatedtime}}</span>
    <span style="margin: 0em 0em 0em 20em">审核状态：{{mypaper.state}}</span>

             
     
    </div>
  <div> <vue-editor id="aaaa"  v-model="form.content" :disabled="disabled" style="margin: 0em 2em 1em 1em;height=100px"></vue-editor></div>
  <el-button type="primary" @click="onSubmit" style="margin: 1em 1em 0.5em 117em">保存</el-button>
  <m-button type="primary" style="margin: 2em 3em 5em 135em" :disabled="mystate"  @click="submitCheck">提交审核</m-button>  
</div>
    
</template>


<script>
 import { VueEditor } from 'vue2-editor'  
import $ from 'jquery'
  
export default{
  components: {
    VueEditor
  },
  data() {
     id:''
     return {  
        form:{
          content:'',
          id:'',
          
        },
        mypaper: {},
        mystate:true,
        disabled: true
    }
  },
  methods:{
   resetpp:function(){
    this.disabled=false;   
    },
    onSubmit:function(){
      
      console.log("thisid",this.form)
      $.ajax({
          url: 'http://localhost:9090/updatePaper',
          type: 'post',
          data:this.form,
          dataType: "text",
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
           
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        this.$router.push({name: 'p-mypaper'})
    },
    submitCheck:function(){
      console.log("thisid",this.id)
       $.ajax({
          url: 'http://localhost:9090/submitCheckPaper',
          type: 'post',
          data:this.id,
          dataType: "text",
          async:false,
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
        this.$router.push({name: 'p-mypaper'})
    }
    
  },

  created: function() {
    this.id = this.$route.params;
    this.form.id = this.$route.params.id;
  
    console.log("wo1",this.id);
    console.log("wo2",this.$route.params);
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/viewpaper',
          type: 'post',
          data:this.id,
          dataType: "text",
           async:false,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.mypaper=data;
            self.form=data;
            console.log("mypaper",self.mypaper)
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        if(self.mypaper.state=='登记中'){
          self.mystate=false
        }
  },
}
</script>
