// pages/mall/mall.js
import Toast from '@vant/weapp/toast/toast';
import { getCommodityCategories, getCommonSpuList } from '../../api/commodity/index';
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        activeId: '',
        // sub标签列表
        subList: [

        ],
        // 当前sub标签下的内容
        items: [

        ],
        // 当前设备信息
        globalData: {
            navHeight: 0,
            top: 0,
            margin: 0,
            height: 0,
            width: 0
        },
        // 搜索框
        searchValue: '',
        // 图片服务器地址，
        imgUrl: '',

        page: 0,
        size: 10,
        pages: 0,
    },
    onSideItem(event) {
        let data = event.currentTarget.dataset;
        this.setData({ activeId: data.id, page: 0 })
        getCommonSpuList({
            cid: data.id,
            page: 0,
            size: this.data.size,
        }).then(value => {
            let data = value.payload;
            let results = data.results.map(v => {
                v.images = v.images.split(',')
                return v;
            })
            this.setData({ items: results, pages: Math.ceil(data.total / this.data.size) })
        }, reason => {
            this.setData({ items: [] })
        })
    },

    clearInput() {
        this.setData({
            searchValue: ''
        })
    },

    onSearchSub(e) {
        let value = e.detail.value;
        wx.navigateTo({
            url: `/pages/mall/search/search?value=${value}`,
            events: {
                // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
                acceptDataFromOpenedPage: function (data) {
                    console.log(data)
                },
                someEvent: function (data) {
                    console.log(data)
                }

            },
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
        })
    },

    getSideItem() {
        if (this.data.page + 1 < this.data.pages) {

        } else {
            wx.showToast({ //如果全部加载完成了也弹一个框
                title: '已经到底了',
                icon: 'success',
                duration: 1000
            });
            return;
        }

        this.setData({ page: this.data.page + 1 }, () => {
            getCommonSpuList({
                cid: this.data.activeId,
                page: this.data.page,
                size: this.data.size,
            }).then(value => {
                let data = value.payload;
                let results = data.results.map(v => {
                    v.images = v.images.split(',')
                    return v;
                })

                this.setData({ items: this.data.items.concat(results) })
            }, reason => {
                // this.setData({items:[]})
            })
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        Toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
        });
        this.getTabBar().setData({ active: "/pages/mall/mall" })

        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        var navHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
        this.setData({
            globalData: {
                top: menuButtonInfo.top,
                margin: menuButtonInfo.top - systemInfo.statusBarHeight,
                height: menuButtonInfo.height,
                navHeight: navHeight,
                width: menuButtonInfo.width
            }, imgUrl: App.globalData.imgUrl
        })


        getCommodityCategories().then(value => {
            let data = value.payload;

            this.setData({ subList: data.results })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // Toast.clear();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        Toast.clear();
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