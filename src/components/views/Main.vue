<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header />
      </el-header>
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from "../commonAside.vue";
import CommonHeader from "../commonHeader.vue";
import commonTag from "../commonTag.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    commonTag,
  },
  data() {
    return {};
  },
};
</script>
  
  <style scoped>
.el-header {
  background: #333;
}
.el-main {
  padding: 10px 20px 0;
}
</style>
  