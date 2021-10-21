// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   value:[
     {name:"鲍玺如",number:"01",checked:false,initial:"B"},
     {name:"陈灿妍",number:"02",checked:false,initial:"C"},
     {name:"崔钰琪",number:"03",checked:false,initial:"C"},
     {name:"段至垚",number:"04",checked:false,initial:"D"},
     {name:"范子曰",number:"05",checked:false,initial:"F"},
     {name:"高锦泽",number:"06",checked:false,initial:"G"},
     {name:"高靖祺",number:"07",checked:false,initial:"G"},
     {name:"高圣博",number:"08",checked:false,initial:"G"},
     {name:"郭紫瑶",number:"09",checked:false,initial:"G"},
     {name:"郝冬骏",number:"10",checked:false,initial:"H"},
     {name:"浑展懿",number:"11",checked:false,initial:"H"},
     {name:"姜子沫",number:"12",checked:false,initial:"J"},
     {name:"靳盛然",number:"13",checked:false,initial:"J"},
     {name:"李晨祎",number:"14",checked:false,initial:"L"},
     {name:"李朔兮",number:"15",checked:false,initial:"L"},
     {name:"李杨",number:"16",checked:false,initial:"L"},
     {name:"李赵睿",number:"17",checked:false,initial:"L"},
     {name:"李政轩",number:"18",checked:false,initial:"L"},
     {name:"刘君紫",number:"19",checked:false,initial:"L"},
     {name:"刘筱灿",number:"20",checked:false,initial:"L"},
     {name:"刘欣谕",number:"21",checked:false,initial:"L"},
     {name:"路雅方",number:"22",checked:false,initial:"L"},
     {name:"牛宇轩",number:"23",checked:false,initial:"N"},
     {name:"潘奕璇",number:"24",checked:false,initial:"P"},
     {name:"尚承熙",number:"25",checked:false,initial:"S"},
     {name:"时子芮",number:"26",checked:false,initial:"S"},
     {name:"史涵宇",number:"27",checked:false,initial:"S"},
     {name:"宋玥萱",number:"28",checked:false,initial:"S"},
     {name:"孙凡茹",number:"29",checked:false,initial:"S"},
     {name:"孙艺闻",number:"30",checked:false,initial:"S"},
     {name:"唐诚泽",number:"31",checked:false,initial:"T"},
     {name:"田静舒",number:"32",checked:false,initial:"T"},
     {name:"王辰钰萱",number:"33",checked:false,initial:"W"},
     {name:"王道凝",number:"34",checked:false,initial:"W"},
     {name:"王珂然",number:"35",checked:false,initial:"W"},
     {name:"王宇烁",number:"36",checked:false,initial:"W"},
     {name:"王泽远",number:"37",checked:false,initial:"W"},
     {name:"王照鑫",number:"38",checked:false,initial:"W"},
     {name:"王梓珊",number:"39",checked:false,initial:"W"},
     {name:"魏然",number:"40",checked:false,initial:"W"},
     {name:"吴昕怡",number:"41",checked:false,initial:"W"},
     {name:"闫家铭",number:"42",checked:false,initial:"Y"},
     {name:"杨皓文",number:"43",checked:false,initial:"Y"},
     {name:"杨谟溪",number:"44",checked:false,initial:"Y"},
     {name:"杨雨硕",number:"45",checked:false,initial:"Y"},
     {name:"于佳琪",number:"46",checked:false,initial:"Y"},
     {name:"张俪檬",number:"47",checked:false,initial:"Z"},
     {name:"张铭泽",number:"48",checked:false,initial:"Z"},
     {name:"张绍翔",number:"49",checked:false,initial:"Z"},
     {name:"张文一",number:"50",checked:false,initial:"Z"},
     {name:"张夏萱",number:"51",checked:false,initial:"Z"},
     {name:"张一茗",number:"52",checked:false,initial:"Z"},
     {name:"张云溪",number:"53",checked:false,initial:"Z"},
     {name:"赵泽铭",number:"54",checked:false,initial:"Z"},
     {name:"朱宸羲 ",number:"55",checked:false,initial:"Z"}
    ],
    select:[],
    text:"",
    lengthvalue:0,
    heightvalue:0
  },
  ontap(val){
    let item=val.currentTarget.dataset.item;
    let _value=[...this.data.value];
    let _index=parseInt(item.number)-1;
    let _checked=item.checked;
    let _select=[...this.data.select];
    let _text=this.data.text;
    _value[_index].checked=!_checked;
    if(_checked){
      let newtext=''
      let newselect=_select.filter((value, index, arr)=>{
        if(value.number!==item.number){
          newtext=newtext+(newtext===''?'':'、')+value.name
          return true;
        }else{
          return false;
        }
      });
      _text=newtext;
      _select=[...newselect]
    }else{
      _select.push(item);
      _text=_text+(_text===''?'':'、')+item.name
    }

    this.setData({
      value:[..._value],
      select:[..._select],
      text:_text,
      lengthvalue:_select.length
    })
  },
  handlecopy(e){
    let that=this;
    wx.setClipboardData({
      data: that.data.text,
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  handlereset(){
    let _value=[...this.data.value];
    _value.map((value,index)=>{
      value.checked=false;
    });
    this.setData({
      value:[..._value],
      select:[],
      text:'',
      lengthvalue:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口高度
        let clientHeight = res.windowHeight;
        // 算出比例
        //let ratio = 750 / clientHeight;
        // 算出高度(单位rpx)
        //let height = clientHeight * ratio-370;
        // 设置高度
        that.setData({
          heightvalue: clientHeight-330
        });
      }
    });
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