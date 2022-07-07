// pages/order/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetailList:
      {
      "id": "od11441670063574806528",
      "amount":1000,
      "providerId": "1",
      "remark": "测试",
      "status": 1,
      "rcvName": "ZYJ",
      "rcvPhone": "11011011011",
      "rcvAddr": "秋名山",
      "createTime": "2021-09-25 07:45:03",
      "sendTime": null,
      "completeTime": null,
      "closeTime": null,
      "closeReason": null,
      "items": [
        {
            "id": "itm21441670063595778048",
            "price":100,
            "orderId": "od11441670063574806528",
            "title": "手机 10寸/20g",
            "image": "be/bee7739ce0154e17b708424bdcb8f9b6.jpg",
            "spec": "10寸/20g",
            "quantity": 3,
            "originSpuId": "spu31441370908474273792"
        },{
          "id": "itm21446014784518549504",
          "orderId": "od11446014784510160896",
          "title": "iphone 土豪金",
          "price":100,
          "image": "8d/8d530d1b5e0c4c9fbbc3a6f880eb04da.jpg",
          "spec": "土豪金",
          "quantity": 1,
          "originSpuId": "spu31442815526336262144"
      }
    ]
  },
  chineseMeaning:{
      "id": "订单号",
      "amount":"数量",
      "providerId": "发货人ID",
      "remark": "备注",
      "status": "状态",
      "rcvName": "收货人姓名",
      "rcvPhone": "收货人手机号",
      "rcvAddr": "收货人地址",
      "createTime": "创建时间",
      "sendTime": "发货时间",
      "completeTime": "订单完毕时间",
      "closeTime": "订单关闭时间",
      "closeReason": "订单关闭原因"
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})