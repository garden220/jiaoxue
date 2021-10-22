// components/drag-sort-anim/drag-sort-anim.js
const systemInfo = wx.getSystemInfoSync()
let rpx2px = function (rpx) {
  return systemInfo.windowWidth / 750 * rpx
}
const IMAGE_SIZE_WIDTH = rpx2px(160) // 图片尺寸
const IMAGE_SIZE_HEIGHT = rpx2px(80)
const COLS = 4 // 图片列数
const MARGIN_IMAGE = rpx2px(0) // 图片间距
const MARGIN_CONTAINER = rpx2px(0) // 容器间距
const MAX_COUNT = 0 // 图片最大数量

Component({
  /**
   * 组件的属性列表
   */
  options:{
    styleIsolation: 'shared'
  },
  properties: {
    data: {
      type: Array,
      value: [],
      observer(val) {
        if (val && val.length > 0) {
          this.initPosition()
        }
      }
    },
    deletestate:{
      type: Boolean,
      value: false
    }
  },
  observers: {
    'deletestate'(val) {
      this.setData({
        deletevalue:val
      });
    },
    'data'(val){
      this.setData({
        imageList:[...val]
      });
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    imageList: [],
    draging: false,
    deletevalue:false
  },
  lifetimes: {
    attached: function () {
      let _delete=this.data.deletestate;
      this.setData({
        deletevalue:_delete
      });
    },
  },
  
  /**
   * 组件的方法列表
   */
  
  methods: {
    initPosition () {
      let data = [...this.data.data]
      if (data.length < MAX_COUNT) {
        data.push({
          type: 'upload'
        })
      }
      this.setData({
        imageList: data.map((item, index) => {
          let top = MARGIN_CONTAINER + Math.floor(index / COLS) * (IMAGE_SIZE_HEIGHT + MARGIN_IMAGE)
          let left = MARGIN_CONTAINER + Math.floor(index % COLS) * (IMAGE_SIZE_WIDTH + MARGIN_IMAGE)
          let imageItem = {
            index: index,
            boxTop: top,
            boxLeft: left,
            top,
            left,
            selectvalue:item
          }
          return imageItem
        })
      })
    },
    handleTouchstart(e) {
      let changedTouch = e.changedTouches[0]
      let {index} = e.currentTarget.dataset
      this.setData({
        startIndex: index, // 滑动的图片索引
      })
      this.setData({
        draging: true
      })
      // 起始位置信息
      this.startClient = {
        startX: changedTouch.clientX,
        startY: changedTouch.clientY,
        startTop: this.data.imageList[index].top,
        startLeft: this.data.imageList[index].left,
      }
    },
    handleTouchend() {
      if (!this.data.draging) {
        return
      }
      let imageList = this.data.imageList
      let activedImage = imageList[this.data.startIndex]
      imageList[this.data.startIndex] = {
        ...activedImage,
        top: activedImage.boxTop,
        left: activedImage.boxLeft,
      }
      this.setData({
        startIndex: null,
        imageList
      })
      let validImageList = this.data.imageList.filter((item) => {
        return item.type !== 'upload'
      })
      validImageList.sort((pre, next) => {
        return pre.index - next.index
      })
      let imageSortedList = validImageList.map((item) => {
        return item.selectvalue
      })
      setTimeout(() => {
        this.setData({
          draging: false,
        })
        this.triggerEvent('change', {
          imageSortedList
        })
      }, 200)
    },
    handleTouchMove(e) {
      if (!this.data.draging) {
        return
      }
      let changedTouch = e.changedTouches[0]
      // 滑动距离
      let moveX = changedTouch.clientX - this.startClient.startX
      let moveY = changedTouch.clientY - this.startClient.startY
      let imageList = this.data.imageList
      imageList.forEach((item, index) => {
        if (index === this.data.startIndex) {
          item.top = this.startClient.startTop + moveY
          item.left = this.startClient.startLeft + moveX
        }
      })
      this.setData({
        imageList
      })
      let direction = null
      for (let i = 0; i < imageList.length; i++) {
        if (this.data.startIndex !== i &&
          imageList[i].type !== 'upload' &&
          changedTouch.clientX-10 > imageList[i].left &&
          changedTouch.clientY-89 > imageList[i].top &&
          changedTouch.clientX-10 < imageList[i].left + IMAGE_SIZE_WIDTH &&
          changedTouch.clientY-89 < imageList[i].top + IMAGE_SIZE_HEIGHT) {
          if (imageList[this.data.startIndex].boxTop > imageList[i].top) {
            direction = 'up'
          } else if (imageList[this.data.startIndex].boxTop < imageList[i].top) {
            direction = 'down'
          } else {
            direction = 'normal'
          }
          this.swap(direction, i)
        }
      }
    },
    // 交换
    swap(direction, index) {
      let imageList = this.data.imageList
      if (direction === 'normal') {
        let endImage = imageList[index]
        let activedImage = imageList[this.data.startIndex]
        imageList[index] = {
          ...imageList[index],
          index: activedImage.index,
          top: activedImage.boxTop,
          left: activedImage.boxLeft,
          boxTop: activedImage.boxTop,
          boxLeft: activedImage.boxLeft,
        }
        imageList[this.data.startIndex] = {
          ...imageList[this.data.startIndex],
          index: endImage.index,
          boxTop: endImage.boxTop,
          boxLeft: endImage.boxLeft,
        }
      } else if (direction === 'up') {
        let startIndex = imageList[index].index
        let endIndex = imageList[this.data.startIndex].index
        let imageListCache = [...imageList]
        for (let i = startIndex; i < endIndex; i++) {
          let nextImage = imageListCache.find((item) => {
            return item.index === i + 1
          })
          let currentIndex = imageListCache.findIndex((item) => {
            return item.index === i
          })
          imageList[currentIndex] = {
            ...imageList[currentIndex],
            index: nextImage.index,
            top: nextImage.boxTop,
            left: nextImage.boxLeft,
            boxTop: nextImage.boxTop,
            boxLeft: nextImage.boxLeft,
          }
        }
        let startImage = imageListCache.find((item) => {
          return item.index === startIndex
        })
        imageList[this.data.startIndex] = {
          ...imageList[this.data.startIndex],
          index: startImage.index,
          boxTop: startImage.boxTop,
          boxLeft: startImage.boxLeft,
        }
      } else if (direction === 'down') {
        let startIndex = imageList[this.data.startIndex].index
        let endIndex = imageList[index].index
        let imageListCache = [...imageList]
        for (let i = endIndex; i > startIndex; i--) {
          let preImage = imageListCache.find((item) => {
            return item.index === i - 1
          })
          let currentIndex = imageListCache.findIndex((item) => {
            return item.index === i
          })
          imageList[currentIndex] = {
            ...imageList[currentIndex],
            index: preImage.index,
            top: preImage.boxTop,
            left: preImage.boxLeft,
            boxTop: preImage.boxTop,
            boxLeft: preImage.boxLeft,
          }
        }
        let endImage = imageListCache.find((item) => {
          return item.index === endIndex
        })
        imageList[this.data.startIndex] = {
          ...imageList[this.data.startIndex],
          index: endImage.index,
          boxTop: endImage.boxTop,
          boxLeft: endImage.boxLeft,
        }
      }
      this.setData({
        imageList
      })
    },
    // 删除
    handleDelete(e) {
      let imageList = this.data.imageList
      let startIndex = e.currentTarget.dataset.index
      let endIndex = imageList.length
      let imageListCache = [...imageList]
      for (let i = endIndex; i > startIndex; i--) {
        let preImage = imageListCache.find((item) => {
          return item.index === i - 1
        })
        let currentIndex = imageListCache.findIndex((item) => {
          return item.index === i
        })
        imageList[currentIndex] = {
          ...imageList[currentIndex],
          top: preImage.boxTop,
          left: preImage.boxLeft,
          boxTop: preImage.boxTop,
          boxLeft: preImage.boxLeft,
        }
      }
      imageList[startIndex] = {
        ...imageList[startIndex],
        deleted: true,
      }
      this.setData({
        draging: true,
        imageList,
      })
      setTimeout(() => {
        this.data.imageList.splice(startIndex, 1)
        let validImageList = this.data.imageList.filter((item) => {
          return item.type !== 'upload'
        })
        this.setData({
          draging: false,
        })
        this.triggerEvent('change', {
          imageSortedList: validImageList.map((item) => {
            return item.selectvalue
          })
        })
      }, 200)
    }
  }
})
