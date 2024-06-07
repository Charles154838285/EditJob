<template>
  <div class="mainbody">
    <h1 class="headtitle">首页</h1>
    <div>
      <h2 class="">{{ demoStore.helloPinia}}</h2>
    </div>
    
    <div class="uploadimage">
      <p class="commodity_img">
            <!-- 上传图片
              :class="boxdisplay"
             -->
            <el-upload
              :on-success="handleSuccess"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="handleChanges"
              :before-remove="beforeRemove"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList "
              multiple
              limit="1"
              name="img"
            >
              <el-icon class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
        </p>

    <el-dialog v-model="dialogVisible">
      <img w-full class="imageshow" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
  <el-button type="primary" @click="uploadimg">上传图片</el-button>
  </div>
</template>
<script setup lang="ts">
  import { mainStore} from '../../store/index'
  /* 引入storeToRefs */
  import { storeToRefs } from 'pinia'

  //storeToRefs只会关注sotre中数据，不会对方法进行ref包裹

  /* 得到countStore */
  const demoStore =mainStore()

  import axios from 'axios'
  //进行测试接口调用
  const adduser=()=>{
    let formData = new FormData();
    formData.append("username","12345");
    formData.append("password","54321");
    let url = 'http://127.0.0.1:5000/adduser' //访问后端接口的url
    let method = 'post'
    axios({
      method,
      url,
      data: formData,
    }).then(res => {
      // alert(res.data)
      console.log("你好")
    });
  }
  adduser()

  import { ref } from 'vue'
  import { ElMessage } from 'element-plus';
  import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

  import type { UploadFile } from 'element-plus'

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const disabled = ref(false)

  const handleRemove = (file: UploadFile) => {
    file.url = '';
    file=null;
  }

  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
  }

  const handleDownload = (file: UploadFile) => {
   
  }

  const boxdisplay = ref("show_box");

  const upload_btn = ref(false);
  const fileList = ref([]);
  const handleSuccess = () => {
    // 上传成功后，隐藏上传按钮
    upload_btn.value = true;
  };
  const handleChanges = img => {
    fileList.value.push(img);
    boxdisplay.value = "hide_box";
  };
  import {ElMessageBox} from 'element-plus'
  // 删除
  const beforeRemove = () => {
    const result = new Promise((resolve, reject) => {
      ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          boxdisplay.value = "show_box";
          resolve();
          fileList.value = [];
          upload_btn.value = false;
        })
        .catch(() => {
          reject(false);
        });
    });
    return result;
  };
  const uploadimg = () => {
    // alert("上传图片")
    let formData = new FormData();
      // 遍历fileList，为每个文件创建一个新的表单字段 
    formData.append("username","12345");
    fileList.value.forEach((file, index) => {  
      // 假设后端期望的文件字段名为 'file[]' 以支持多文件上传  
      // 如果后端只期望单个文件，则字段名可能只是 'file'  
      // formData.append(`file[${index}]`, file.raw);  
      formData.append("file",file.raw);
      console.log(file.raw)
    });  

    let url = 'http://127.0.0.1:5000/uploadimages' //访问后端接口的url
    let method = 'post'
    axios({
        method,  
        url,  
        data: formData,  
        headers: {  
          'Content-Type': 'multipart/form-data' // 确保设置了正确的Content-Type  
        }  
    }).then(res => {
        const result = new Promise((resolve, reject) => {
                resolve();
                fileList.value = [];
                upload_btn.value = false;
                ElMessage({ message: '图片上传成功', type: 'success' });  
              })
              .catch(() => {
                reject(false);
              });
          });
  }
</script>

<style scoped>
.mainbody {
  position: relative;
  width:100vw;
  height: 100vh;
  display: block;
}
.headtitle {
  filter: drop-shadow(0 0 2em #646cffaa);
  margin: 0;
}
</style>
<style lang="scss" scoped>
/* #在此处编写代码 */
.mainbody{
  background: #76cfe5;
}
</style>
<style scoped>
.hide_box  {
  display: none;
}
.show_box{
  display: inline-flex;
}
.imageshow{
  width: 100%;  
  height: 100%;  
  object-fit: fill; 
}
</style>