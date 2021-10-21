//获取应用实例
const app = getApp()

Page({
  data: {
    imageList: [1, 2, 3, 4, 5],
    show: false,
  },
  onLoad: function () {
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
  }
})
