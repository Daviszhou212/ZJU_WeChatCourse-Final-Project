// component/songItem/songItem.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      item:{
        type:Object,
        value:{}
      },
      singer:{
        type:String,
        value:{}
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      favor:false,
      counterId:null
  },
  pageLifetimes:{
    show:function(){
      let states = app.globalData.favorMusics;
      let index = this.properties.item.id;
      this.setData({favor:states.musics[index],counterId:states.counterIds[index]})
    }
  },
  ready:function(){
    console.log(this.properties.items,this.properties.singer)
  },
  /**
   * 组件的方法列表
   */
  methods: {
  handleClick: function( ){
    var musicPlayer = app.globalData.player;
    console.log(musicPlayer.data);
      app.globalData.plCayState = 1;
      app.globalData.musicPic = this.properties.item.poster;
      app.globalData.musicName = this.properties.item.name;
      app.globalData.musicUrl = this.properties.item.src;
      app.globalData.artistName = this.properties.singer;
  musicPlayer.setData({
    playState: app.globalData.playState,
    musicPic: app.globalData.musicPic,
    musicName: app.globalData.musicName,
    musicUrl: app.globalData.musicUrl,
    artistName: app.globalData.artistName
});
  musicPlayer.change( );
  

  },
  handleFavor:function(){
    this.setData({favor:!this.data.favor})
    console.log(this.data.favor)
    if(this.data.favor){
      this.favorMusic();
    }else{
      this.disfavorMusic();
    }
  },
  favorMusic: function( ) {
    const db = wx.cloud.database()
    db.collection('music_favor').add({
    data: {
    sid: this.properties.item.id,
    singer: this.properties.singer,
    favor: true
    },
    success: res =>{
    this.setData({
        counterId: res._id,
        count: 1
    })
    wx.showToast({
      title: '已收藏',
    
    })
    console.log('[数据库][新增记录]成功，记录_id:', res._id)
    app.globalData.favorMusics.musics[this.properties.item.id] = true
    app.globalData.favorMusics.counterIds[this.properties.item.id] = this.data.counterId
  },
    
    fail: err => {
    wx.showToast({
    icon: 'none ' ,
    title: '新增记录失败'
    })
    console.error('[数据库][新增记录]失败:', err)
    }
    })
  },
  disfavorMusic: function( ) {
    if (this.data.counterId) {
    const db = wx.cloud.database()
    db.collection('music_favor').doc(this.data.counterId).remove({
    success:res => {
    wx. showToast({
    title: '已取消收藏',
    })
    this.setData({
      counterId: '',
      count: null,
    })
    app.globalData.favorMusics.musics[this.properties.item.id] = false
    app.globalData.favorMusics.counterIds[this.properties.item.id] = undefined
  },
  fail: err => {
    wx.showToast({
    icon: 'none',
    title:'删除失败',
    })
    console.error('[数据库][删除记录]失败: ', err)
  }
  })
}else{
    wx.showToast({
      title: '无counterId，该歌曲还未收藏',
    })
  }
}
}
})
