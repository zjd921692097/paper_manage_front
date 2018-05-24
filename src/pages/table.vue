<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">论文统计</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >论文统计</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="box">
     <Row>
      
        <Col span="12">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row>
    <el-table>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="ID" prop="id" width="80"></el-table-column>
      <el-table-column label="标题" prop="action"></el-table-column>
      <el-table-column label="创建时间" prop="result"></el-table-column>
      <el-table-column label="更新时间" prop="desctiption"></el-table-column>
      
      <el-table-column label="创建时间" prop="createdAt">
        <template slot-scope="scope">
          {{format(scope.row.createdAt)}}
        </template>
      </el-table-column>
      <el-table-column label="最后更新" prop="updatedAt">
        <template slot-scope="scope">
          {{format(scope.row.updatedAt)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <m-button type="danger">删除</m-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>

</div>
</template>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>
