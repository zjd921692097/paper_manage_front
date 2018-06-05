<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">论文类型</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >论文类型</el-breadcrumb-item>     
    </el-breadcrumb>  
  </div>
  <div class="box">
    <el-button type="primary" icon="el-icon-edit" circle @click="addpp"  style="margin: 0.5em 1em 1em 0em"></el-button>
    <el-table :data='tableData'>  
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
      <el-table-column label="ID" prop="id" ></el-table-column>
      <el-table-column label="类型" prop="name"></el-table-column>  
      <el-table-column label="操作" >
        <template slot-scope="scope">
            <m-button type="danger" @click="del(scope.$index, scope.row)">删除</m-button>
        </template>       
      </el-table-column>
    
    </el-table>
  </div> 
</div>
</template>