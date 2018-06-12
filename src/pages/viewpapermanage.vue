<template>
<div>
  <div><el-input style="margin: 2em 10em 0em 35em;width:400px;" placeholder="请输入内容"  v-model="mypaper.title"  :disabled="true"></el-input></div>
   
  <div>
    <el-button type="primary"    @click="dialogVisible = true" style="margin: 0em 3em 1em 1em" :disabled="mystate">审核</el-button>
    <el-dialog title="审核"  :visible.sync="dialogVisible"  width="13%" :before-close="handleClose">
  
  
    <el-button type="primary" @click="dialogVisible = false;checkok()">通过</el-button>
    <el-button type="primary" @click="dialogVisible = false;checkno()">不通过</el-button>
  
</el-dialog>
    <span >阅读数：{{mypaper.readNum}}</span>
    <span style="margin: 0em 0em 0em 18em">类型：{{mypaper.typeName}}</span>
    <span style="margin: 0em 0em 0em 18em">创建时间：{{mypaper.createdtime}}</span>
    <span style="margin: 0em 0em 0em 18em">更新时间：{{mypaper.updatedtime}}</span>
    <span style="margin: 0em 0em 0em 18em">审核状态：{{mypaper.state}}</span>

    </div>
  <div> <vue-editor id="aaaa"  v-model="mypaper.content" :disabled="form.disabled" style="margin: 0em 2em 1em 1em;height=100px"></vue-editor></div>
 
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
         dialogVisible: false,
        form:{
          content:'',
          stae:'',
          disabled: true
        },
        mypaper: {},
         mystate:true,

    }
  },
  methods:{
     
    
   resetpp:function(){
    this.form.disabled=false;   
    },
    
   checkok:function(){
    this.form.state='审核通过' 
    this.checkto()  
    this.$router.push({name: 'p-data-table'})
    },
    checkno:function(){
    this.form.state='审核失败'   
    this.checkto()
    this.$router.push({name: 'p-data-table'})
    },
    checkto:function(){
       $.ajax({
          url: 'http://localhost:9090/checkPaper',
          type: 'get',
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
    }
    
  },

  created: function() {
    this.id = this.$route.params;
    console.log("wo1",this.id);
    console.log("wo2",this.$route.params);
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/viewpaper',
          type: 'get',
          data:this.id,
          dataType: "text",
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.mypaper=data;
            self.form=data;
            console.log("1234",self.form)
             if(self.mypaper.state=='待审核'){
          self.mystate=false
        }
            console.log("mypaper",self.mypaper)
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })

  },
}
</script>
