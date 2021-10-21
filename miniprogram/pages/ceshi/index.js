//获取应用实例
const app = getApp()

Page({
  data: {
    imageList: [
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
 
     ],
    show: false,
    wheight:0,//屏幕高度rpx
    rpx:0, //rpx比例
    deletestate:false
  },
  onLoad: function () {
    this.rpx2px();
    this.setData({wheight:wx.getSystemInfoSync().windowHeight*this.data.rpx})
    console.log(this.data.wheight)
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  handleChange (e) {
    console.log('排序后')
    console.log(e.detail.imageSortedList)
    this.setData({
      imageList: e.detail.imageSortedList
    })
  },
  rpx2px() {
    this.setData({
      rpx:wx.getSystemInfoSync().windowWidth / 750
    })
  },
  onDelete(){
    let _delete=this.data.deletestate;
    this.setData({
      deletestate:!_delete
    });
  }
})
