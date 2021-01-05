// miniprogram/pages/hotDetail/hotDetail.js
var songList = require("../../datas/songList.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer:null,
    poster:null,
    dataSource:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var player = this.selectComponent("#player");
     console.log(player);
     app.globalData.player = player;
      const {singer,poster} = options;
      console.log(singer,poster)
      this.setData({singer:singer,poster:poster})
      switch(singer){
        case "周杰伦":
                this.setData({dataSource:songList.zhouJieLun});
                break;
        case "李荣浩":
                this.setData({dataSource:songList.liRongHao});
                break;
        case "许嵩":
                this.setData({dataSource:songList.xuSong});
                break;
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.dataSource)
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