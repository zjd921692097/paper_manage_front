<template>
    <div class="paper_detail" v-html="form.content"></div>
</template>


<script>
import $ from 'jquery'
export default{
  data() {
    paperid:''
     return {  
        form:{
          content:''
        },

    }
  },
  methods:{
    
  },

  created: function() {
    this.paperid = this.$route.params;
    console.log("wo",this.paperid);
    var self = this;
    $.ajax({
          url: 'http://localhost:9090/viewpaper',
          type: 'get',
          data:this.paperid,
          dataType: "text",
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.form.content=data
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
  },
}
</script>