<template>
  <!-- 搜索栏 -->
  <a-form layout="inline">
    <a-form-item label="门店">
      <a-input v-model:value="listParm.roomName" placeholder="请输入门店"></a-input>
    </a-form-item>
    <a-form-item label="偏好类型">
      <a-input v-model:value="listParm.courseName" placeholder="请输入类型"></a-input>
    </a-form-item>
    <a-form-item label="员工">
      <a-input v-model:value="listParm.courseType" placeholder="请输入员工"></a-input>
    </a-form-item>
    <a-button @click="searchBtn" style="margin-right: 20px;">
      <template #icon>
        <search-outlined />
      </template>
      搜索
    </a-button>
    <a-button @click="resetBtn" type="danger" style="margin-right: 20px;">
      <template #icon>
        <close-outlined />
      </template>
      重置
    </a-button>
    <a-button v-permission="['sys:course:add']" @click="addBtn" type="primary" style="margin-right: 20px;">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>
  </a-form>
  <!-- 表格列表 -->
  <a-table
    :scroll="{ y: tableHeight }"
    style="margin-top: 10px;"
    bordered
    :dataSource="tableList.list"
    :pagination="rolePage"
    :columns="columns"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button v-permission="['sys:course:edit']" @click="editBtn(record)" type="primary">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button v-permission="['sys:course:detete']" @click="deleteBtn(record)" style="margin-left: 15px;" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
  </a-table>
  <!-- 新增或编辑弹框 -->
  <add-course @save="save" ref="addRef"></add-course>
</template>
<script setup lang='ts'>
import type { SelectProps } from 'ant-design-vue';
import AddCourse from './AddCourse.vue';
import { ref } from 'vue'
import useTable from '@/composable/course/useTable';
import useCourse from '@/composable/course/useCourse';
//表格相关的操作
const { rolePage, tableHeight, tableList, listParm, columns,getList } = useTable()

//新增、编辑
const {addBtn,editBtn,deleteBtn,save,addRef,searchBtn,resetBtn} = useCourse(getList,listParm)

</script>
<style scoped lang='scss'>
</style>
