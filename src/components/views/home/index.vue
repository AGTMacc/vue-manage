<template>
  <el-row class="home" :gutter="20" style="height: 100%">
    <el-col :span="8">
      <el-card shadow="always">
        <div class="user">
          <el-avatar
            :size="110"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>123123</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="always" style="margin-top: 10px; height: 355px">
        <el-table :data="tableData" height="355" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detall">
            <p class="num1">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 250px">
        <echart :chartData="echartData.order" style="height: 250px"></echart>
      </el-card>
      <div class="graph">
        <el-card style="height: 190px">
          <echart :chartData="echartData.user" style="height: 190px"></echart>
        </el-card>
        <el-card style="height: 190px">
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 170px"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../../api/data.js";
import Echart from "../../ECharts.vue";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单2",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日付订单3",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单4",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单5",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日支付订单6",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code == 20000) {
        // 表格
        this.tableData = data.tableData;
        // 折线图
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 柱形图
        const user = data.userData;
        this.echartData.user.xData = user.map((item) => item.data);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: user.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: user.map((item) => item.active),
            type: "bar",
          },
        ];
        // 饼状图
        this.echartData.video.series = [
          {
            type: "pie",
            data: data.videoData,
          },
        ];
      }
    });
  },
};
</script>
    
<style lang="less" scoped>
.user {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 20px;
  .userinfo {
    margin-left: 30px;
    p {
      margin: 0 5px;
    }
    .name {
      font-size: 24px;
    }
    .access {
      color: #666;
      font-size: 14px;
    }
  }
}
.login-info {
  border-top: 1px solid #999;
  padding: 15px 0;
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
    span {
      margin-left: 40px;
      color: #000;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 10px;
    .icon {
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
    .detall {
      padding: 10px;
      .num1 {
        font-size: 20px;
        font-weight: 400;
      }
      .txt {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.graph {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 49%;
  }
}
</style>

