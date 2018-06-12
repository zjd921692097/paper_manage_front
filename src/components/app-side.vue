<template>

<v-menu class="side-menu"
  :collapse="collapse"
  :default-active="defaultActive"
  :menus="menus"
  router
  :background-color="theme.backgroundColor"
  :text-color="theme.textColor"
  :active-text-color="theme.activeTextColor"
  ></v-menu>


</template>
<script type="text/javascript">
import VMenu from './vmenu'
import menus1 from './menus'
import menus2 from './menus2'
import $ from 'jquery'
export default {
  props: {
    collapse: Boolean,
    theme: Object
  },
  components: {
    VMenu
  },
  data () {
    return {
      menus:menus1,
      defaultActive: 'home',
      test: 'asdfasdf',
      account:''
    }
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  methods: {
    setCurrentRoute () {
      // console.log(this.$route)
      this.defaultActive = this.$route.name
    }
  },
  created () {
    var self=this;
     $.ajax({
          url: 'http://localhost:9090/getLoginInfo',
          type: 'Post',
         
          dataType: "text",
          async:false,
          xhrFields: {
           withCredentials: true
          },
          crossDomain: true,
          success: function(data) {
            data=JSON.parse(data)
            console.log(data)
            self.account=data;
          },
          error: function(data) {
            //TODO 失败
            console.log("error", data)
          }
        })
        if(this.account.type==1){
          console.log("type",this.account.type)
          this.menus=menus2
        }
    this.setCurrentRoute()
  }
}
</script>
<style type="text/css">
  .el-menu.side-menu{
    border-right: none;
  }
  .el-menu .fa{
    font-size: 18px;
    margin-right: 7px;
    display: inline-block;
    width: 23px;
    text-align: center;
  }
  .el-menu.side-menu .el-menu-item.is-active {
    color: #409EFF;
    border-right: solid 2px #36c1fa;
    background: #eef3f5;
  }
</style>
