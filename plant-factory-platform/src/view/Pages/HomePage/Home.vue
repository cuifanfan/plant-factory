<template>
  <v-container class="white ma-0" style="max-width: 100%">
    <v-row align-content="center">
      <v-col>
        <v-card hover class="amber darken-2 rounded-lg">
          <v-card-title class="justify-center white--text text-h4"> 当日数据: </v-card-title>
        </v-card>
      </v-col>
      <v-col v-for="(item, i) in homeTitle.newdata" :key="i">
        <v-card hover class="mt-2">
          <v-card-text>
            <h1 class="d-inline">{{ item.data }}</h1>
            {{ item.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card hover class="rounded-lg blue lighten-2">
          <v-card-title class="justify-center white--text text-h4"> 总数据: </v-card-title>
        </v-card>
      </v-col>
      <v-col v-for="(item, i) in homeTitle.alldata" :key="i">
        <v-card hover class="mt-2">
          <v-card-text>
            <h1 class="d-inline">{{ item.data }}</h1>
            {{ item.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="height: 500px">
      <div style="flex: 1">
        <chart></chart>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import chart from "./Chart.vue";
export default {
  data: () => ({
    homeTitle: {
      newdata: [
        {
          title: "新增用户",
          data: 20
        },
        {
          title: "新增订单",
          data: 500
        },
        {
          title: "新增管理员",
          data: 4
        }
      ],
      alldata: [
        {
          title: "注册用户",
          data: 80000
        },
        {
          title: "订单",
          data: 64654
        },
        {
          title: "管理员",
          data: 8
        }
      ]
    }
  }),
  components: {
    chart
  }
};
</script>

<style></style>
