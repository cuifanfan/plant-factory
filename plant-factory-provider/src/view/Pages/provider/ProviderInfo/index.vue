<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left max">项目名称</th>
          <th class="text-left">信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.content }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { getProviderInfo } from "@/api/provider";
export default {
  data() {
    return {
      keyvalue: {
        name: "公司名称",
        province: "所在省份",
        city: "所在城市",
        address: "具体地址",
        createDate: "创建时间",
        location: "经纬度",
        parent: "上级商户",
        status: "当前状态",
        toUser: "是否面向用户销售"
      },
      desserts: [
        {
          name: "公司全名",
          content: "方芯科技江夏分部"
        },
        {
          name: "负责人",
          content: "小明"
        },
        {
          name: "负责人联系方式",
          content: "188****9900"
        },
        {
          name: "公司地址",
          content: "湖北省 武汉市 江夏区 XXXXXXXXXXX"
        }
      ]
    };
  },
  created() {
    getProviderInfo().then((value) => {
      let data = value.payload;
      // 过滤信息
      data.status = data.status == "normal" ? "状态正常" : "状态异常";
      data.toUser = data.toUser ? "面向用户销售" : "面向下级商户";
      let newdes = [];
      for (let i in this.keyvalue) {
        if (this.keyvalue[i])
          newdes.push({
            name: this.keyvalue[i],
            content: data[i]
          });
      }
      this.desserts = newdes;
    });
  }
};
</script>

<style scoped>
.max {
  width: 200px;
}
</style>
