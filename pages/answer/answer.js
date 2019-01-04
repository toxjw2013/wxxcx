// pages/answer/answer.js
// const player =wx.createInnerAudioContext();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    life:5,
    score:0,
    answer:null,
    answers:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // wx.createAudioContext('bg').play();
    // player.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    // player.autoplay = true;
    // player.loop = true;
    // console.log(app.globalData.type);
    that.init();
   
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getAnswer();
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
  bgplay:function(e){
    if(e.detail.value){
      // wx.createAudioContext('bg').play();
      player.play();
    }else{
      // wx.createAudioContext('bg').pause();
      player.stop();
    }
  },
  answer:function(e){
    var flag = e.target.id;
    var that =this;
    if(flag==this.data.answer.answer){
      that.setData({
        score:that.data.score+1,
      })
    }else{
      that.setData({
        life:that.data.life-1,
      })
    }
    if(that.data.life==0){
      wx.showModal({
        title: 'GAME OVER',
        content: '你的得分:'+that.data.score,
        showCancel:false,
        confirmText:'重新开始',
        success(res){
          console.log(res.confirm);
          wx.removeStorage({
            key: 'answers',
            success: function(res) {},
          })
          if(res.confirm){
            wx.reLaunch({
              url: '../pickType/pickType',
            })
          }
        }
      })
    }else{
      that.getAnswer();
    }
  },
  getAnswer:function(){
    if(this.data.answers.length !=0){
      var that=this;
      var index = Math.floor(Math.random() * (that.data.answers.length));
      console.log(that.data.answers.length);
      that.setData({
        answer: that.data.answers[index],
      })
    }
  },
  init:function(){
    var that = this;
    var arr=null;
    wx.request({
      url: 'https://www.xmhz6.com/answer?type=' + app.globalData.type,
      method: 'GET',
      success:function(res){
        // console.log(res.data);
        that.setData({
          answers:res.data,
        });
        that.getAnswer();
      }
    })
    // console.log(this.data.answers);
  }
})