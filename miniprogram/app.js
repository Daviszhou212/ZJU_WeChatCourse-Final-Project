//app.js
import {DEFAULT_MUSIC} from './config/index.js'
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({

        traceUser: true,
      })
    }
    this.globalData = {        
      userInfo:null,
      audio:wx.createInnerAudioContext(),
      playState:DEFAULT_MUSIC.playState,
      musicPic:DEFAULT_MUSIC.musicPic,
      musicName:DEFAULT_MUSIC.musicName,
      musicUrl:DEFAULT_MUSIC.musicUrl,
      artistName:DEFAULT_MUSIC.artistName,
      musicPlayer:null,
      favorMusics:{}
    }
    this.globalData.audio.src = DEFAULT_MUSIC.musicUrl
    this.getFavorMusics()
  },

getFavorMusics:function()
{
  console.log("getFavorMusics")
  const db = wx.cloud.database()
  db.collection('music_favor').field({sid:true,_id :true}).get({success:res=>{
    let musics = new Array(res.data.length+1);
    let counterIds = new Array(res.data.length+1);
    res.data.forEach(function(item, index){
      musics[item.sid] = true;
      counterIds[item.sid] = item._id
    })
  console.log(musics.counterIds)
  this.globalData.favorMusics = {
    musics:musics,
    counterIds:counterIds
      }
  },
  fail:err=>{
    wx.showToast({
      icon: 'none',
      title:'查询记录失败'
    })
    console.error('[数据库][查询记录]失败',err)
  }
})
}
})
