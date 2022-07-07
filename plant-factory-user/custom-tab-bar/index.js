// custom-tab-bar/index.js
Component({

    /**
     * 页面的初始数据
     */
    data: {
        active:"/pages/homr/home",
    },
    methods:{
      onChange(event) {
        wx.switchTab({
          url: event.detail,
        })
      },
    },
})