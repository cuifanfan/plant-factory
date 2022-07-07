// pages/mine/mine.js
import {
    login
} from '../../api/account/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName: '微信授权登录',
            avatarUrl: "https://b.yzcdn.cn/vant/icon-demo-1126.png"
        },
        hasUserInfo: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTabBar().setData({
            active: "/pages/mine/mine"
        })
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

    console() {
        console.log('dwad')
    },

    /*
     * 微信授权
     */
    acceptAuthorization() {
        if (!this.hasUserInfo) {
            wx.getUserProfile({
                desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    console.log(res)
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                    this.onLogin({
                        
                    })
                }
            })
        }
    },


    /*
     * 微信跳转到order页面
     */
    navigateToOrder() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },


    onLogin(data) {
        wx.login({
            success(res) {
                console.log(res);
                if (res.code) {
                    //发起网络请求
                    login(res.code,data).then(value => {
                        console.log(value);
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
    handleAllowToGetPhoneNumAction (e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
      }
})