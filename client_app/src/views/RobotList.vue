<template>
    <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%">
        <el-table-column
            type="index"
            label="index"
            align="center"
            width="70">
        </el-table-column>
        <el-table-column
            prop="date"
            label="Creating Time"
            width="250">
        </el-table-column>
        
        <el-table-column
          prop="type"
          label="furhat type"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="furhat describe"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column 
            prop="face_information" 
            label="facial info" 
            align="center" 
            width="170">
        </el-table-column>
        <!-- <template slot-scope="scope">
            <span style="margin-left: 10px;">{{ scope.row.date }}</span>
        </template> -->
        <el-table-column 
            prop="sound_information" 
            label="sound info" 
            align="center" 
            width="170">
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios'; 

const tableData = ref([]);

const getProfileData = async () => {
  try {
    const response = await axios.get('api/profiles', {
      headers: {
        'Authorization': `${localStorage.getItem('eleToken')}`
      }
    });
    console.log(response.data);
    tableData.value = response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    ElMessage.error('Failed to load data. Please try again later.');
  }
};

onMounted(() => {
  getProfileData();
});
</script>



