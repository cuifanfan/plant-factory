<template>
  <div ref="main" :style="{ height: '100%' }"></div>
</template>

<script>
import * as echarts from "echarts/core";
import { DatasetComponent, TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, DatasetComponent, BarChart]);
export default {
  data() {
    return {
      option1: {
        title: {
          text: "后台数据总览"
        },
        legend: {},
        tooltip: {
          trigger: "axis"
        },
        dataset: {
          source: [
            ["product", "新注册用户", "新增订单", "新增管理员"],
            ["2021-07-16", 5, 6, 8],
            ["2021-07-17", 83, 73, 55],
            ["2021-07-18", 86, 65, 82],
            ["2021-07-19", 72, 53, 39],
            ["2021-07-20", 72, 53, 39],
            ["2021-07-21", 72, 53, 39]
          ]
        },
        xAxis: { type: "category", boundaryGap: false },
        yAxis: {},
        series: [{ type: "line" }, { type: "line" }, { type: "line" }],
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              title: "数据视图",
              lang: ["数据视图", "关闭", "刷新"]
            },
            saveAsImage: {
              title: "保存为图片"
            },
            magicType: {
              show: true,
              type: ["line", "bar"],
              title: {
                line: "切换为折线图",
                bar: "切换为柱状图"
              },
              option: {
                bar: {
                  xAxis: {
                    boundaryGap: true
                  }
                }
              }
            }
          }
        }
      },
      myChart: {}
    };
  },
  mounted() {
    setTimeout(() => {
      let chartDom = this.$refs.main;
      chartDom.style.width = chartDom.offsetWidth;
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.option1);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }, 0);
  }
};
</script>

<style></style>
