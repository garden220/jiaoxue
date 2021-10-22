//获取应用实例
const app = getApp()

Page({
  data: {
    show: false,
    wheight:0,//屏幕高度rpx
    rpx:0, //rpx比例
    deletestate:false,
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
     temporary:[], //编辑时临时保存数据
     arrange:'0',//排序列数
     arrangeval:['','','']//排序数据
  },
  onLoad: function () {
    this.rpx2px();
    this.setData({wheight:wx.getSystemInfoSync().windowHeight*this.data.rpx})
    console.log(this.data.wheight)
  },
  ontap(val){
    let item={...val.currentTarget.dataset.item};
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
          newtext=newtext+(newtext===''?'':'、')+value.name;
          return true;
        }else{
          return false;
        }
      });
      _text=newtext;
      _select=[...newselect]
    }else{
      item.checked=true;
      _select.push(item);
      _text=_text+(_text===''?'':'、')+item.name
    }
    let _arrangeval=[...this.arrangeText(_text)];
    this.setData({
      value:[..._value],
      select:[..._select],
      text:_text,
      lengthvalue:_select.length,
      arrangeval:_arrangeval
    })
  },
  handlecopy(e){
    let that=this;
    let _text='';
    console.log(that.data.arrange)
    switch(that.data.arrange) {
      case '0':
        _text=that.data.text;
         break;
      case '2':
        _text=that.data.arrangeval[0];
          break;
      case '3':
        _text=that.data.arrangeval[1];
         break;
      case '4':
        _text=that.data.arrangeval[2];
         break;
      default:
        _text=that.data.text;
    } 
    wx.setClipboardData({
      data: _text,
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
  showPopup() {
    let _select=[...this.data.select];
    this.setData({ 
      show: true,
      select:_select
     });
  },
  onClose() {
    this.setData({ show: false,temporary:[],deletestate:false });
  },
  onOk(){
    if(this.data.temporary.length===0){
      this.setData({ 
        show: false,
      });
      return
    }
    let _temporary=[...this.data.temporary];
    let _value=[...this.data.value];
    let _text='';
    //选择数量有变化
    if(_temporary.length<this.data.select.length){
      _value.map((item,index)=>{
        item.checked=false;
        _temporary.map((_item,_index)=>{
            if(_item.number===item.number){
              item.checked=true;
            }
        });
      });
    }
    //重新设置text
    _temporary.map((item,index)=>{
      _text=_text+(_text===''?'':'、')+item.name
    });
    let _arrangeval=[...this.arrangeText(_text)];
    this.setData({ 
      show: false,
      select:_temporary,
      value:[..._value],
      text:_text,
      lengthvalue:_temporary.length,
      deletestate:false,
      arrangeval:_arrangeval,
      temporary:[]
    });
  },
  handleChange (e) {
    this.setData({
      temporary: [...e.detail.imageSortedList]
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
  },
  onArrange(val){
    let _arrange=val.currentTarget.dataset.arrange;
    if(_arrange===this.data.arrange){
      _arrange="0"
    }
    this.setData({
      arrange:_arrange
    })
  },
  arrangeText(val){
    let text1='',text2='',text3='';
    let _val=val.split("、")
    _val.map((item,index)=>{
      text1=text1+(text1===''?'':(index%2===0?'\n':' '))+item;
      text2=text2+(text2===''?'':(index%3===0?'\n':' '))+item;
      text3=text3+(text3===''?'':(index%4===0?'\n':' '))+item;
    })
    return [text1,text2,text3]
  }
})
