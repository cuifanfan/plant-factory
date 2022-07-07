// pages/order/order.js
// import {searchProviderOrder} from "../../api/order/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderList:[
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
              {
                  "id": "od11446014687906951168",
                  "amount":10202,
                  "providerId": "1",
                  "remark": "测试",
                  "status": 1,
                  "rcvName": "ZYJ",
                  "rcvPhone": "11011011011",
                  "rcvAddr": "秋名山",
                  "createTime": "2021-10-07 15:29:02",
                  "sendTime": null,
                  "completeTime": null,
                  "closeTime": null,
                  "closeReason": null,
                  "items": [
                      {
                          "id": "itm21446014687944699904",
                          "orderId": "od11446014687906951168",
                          "title": "设备1 A/自动",
                          "image": "aa/aa8526ae79b84d36b06833dd67fa9747.jpg",
                          "spec": "A/自动",
                          "quantity": 1,
                          "price":2020202,
                          "originSpuId": "spu31442712960537522176"
                      }
                  ]
              },
              {
                  "id": "od11446014784510160896",
                  "amount":10002,
                  "providerId": "1",
                  "remark": "测试",
                  "status": 1,
                  "rcvName": "ZYJ",
                  "rcvPhone": "11011011011",
                  "rcvAddr": "秋名山",
                  "createTime": "2021-10-07 15:29:25",
                  "sendTime": null,
                  "completeTime": null,
                  "closeTime": null,
                  "closeReason": null,
                  "items": [
                      {
                          "id": "itm21446014784518549504",
                          "orderId": "od11446014784510160896",
                          "title": "iphone 土豪金",
                          "image": "8d/8d530d1b5e0c4c9fbbc3a6f880eb04da.jpg",
                          "spec": "土豪金",
                          "quantity": 1,
                          "price":1111111,
                          "originSpuId": "spu31442815526336262144"
                      }
                  ]
              }
    ]
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(this.data.orderList)
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

  },
  /**
   * 切换订单标签
   */
  
  // onChange(event) {
  //   wx.showToast({
  //     title: `切换到标签 ${event.detail.name}`,
  //     icon: 'none',
  //   });
  // },
  /**
   * 切换订单标签
   */
  navigateToOrderDetail(e){
     console.log(e)
    wx.navigateTo({
        url: '/pages/order/orderDetail/orderDetail?orderDetailID='+e.currentTarget.dataset.id,
      })
  }
})