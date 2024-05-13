Page({
  data: {
    currentIndex: 1, // 当前显示的图片索引
    images: ['url1', 'url2', 'url3'], // 图片数组
    scale: [1, 1.1, 1], // 每张图片的缩放比例
    top: [0, -20, 0] // 每张图片的顶部偏移量
  },
  // 切换到下一张图片
  nextImage: function() {
    let currentIndex = this.data.currentIndex;
    let imagesLength = this.data.images.length;
    let nextIndex = (currentIndex + 1) % imagesLength;

    // 重置所有图片的缩放比例和顶部偏移量
    let scale = [1, 1, 1];
    let top = [0, 0, 0];

    // 设置中间图片的缩放比例增加，顶部偏移量减小
    scale[1] = 1.1;
    top[1] = -20;

    this.setData({
      currentIndex: nextIndex,
      scale: scale,
      top: top
    });
  }
});
