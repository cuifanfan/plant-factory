// pages/mall/search/search.js
import {getCommonSpuList} from '../../../api/commodity/index'
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[],
        imgUrl:'',

        page:0,
        size:10,
        pages:0,
    },

    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({imgUrl:App.globalData.imgUrl},()=>{
            let value = options.value;
            getCommonSpuList({
                title:value,
                page:0,
                size:this.data.size,
            }).then(value=>{
                let data = value.payload;
                let results = data.results.map(v=>{
                    v.images = v.images.split(',')
                    return v;
                })
                this.setData({items:results,pages:Math.ceil(data.total/this.data.size)})
            },reason=>{
                this.setData({items:[]})
            })
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

    }
})