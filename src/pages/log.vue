<template>
<div class="page-body">
  <div class="page-header">
    <h1 class="page-title">审核日志</h1>
    <el-breadcrumb>
      <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item >审核日志</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="box">
    <!-- <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="创建时间" label-width="80px">
         <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期"  v-model="form.date1" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.7">- </el-col>
        <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%"></el-date-picker>
        </el-col>
     
        
        <el-col class="line" :span="2" style="text-align:center">用户名</el-col>
        <el-col class="line" span="3">
           <el-input v-model="form.userId" placeholder="请输入用户名" span="3"></el-input>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center">审核</el-col>
        <el-switch v-model="form.state"></el-switch>
      </el-form-item>
     
      <el-form-item label="更新时间" label-width="80px">
         <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期"  v-model="form.date3" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="0.7">- </el-col>
        <el-col :span="3">
           <el-date-picker type="date" placeholder="选择日期" v-model="form.date4" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center">标题</el-col>
        
        <el-col class="line" span="3">
           <el-input v-model="form.title" placeholder="请输入标题" span="3"></el-input>
        </el-col>
        <el-col class="line" span="7" style="text-align:right">
           <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-col>
      </el-form-item>
     
     
      
    </el-form> -->
    
 



     <!-- <Row>
      
        <Col span="12">
            <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row> -->
    <el-table :data='tableData'>
      <!-- <el-table-column label="#" type="index"></el-table-column> -->
     
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="论文名称" prop="paperName"></el-table-column>
      <el-table-column label="创建时间" prop="createdtime"></el-table-column>
    
      <el-table-column label="审核者id" prop="userid"></el-table-column>
      <el-table-column label="审核结果" prop="updatedState"></el-table-column>
    

    </el-table>
  </div> 
</div>


</template>