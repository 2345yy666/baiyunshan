Page({
  data: {


    indicatorDots: true, // 是否显示指示点
    autoplay: true, // 是否自动播放
    interval: 3000, // 自动播放间隔时间（单位：毫秒）
    duration: 500, // 滑动动画时长（单位：毫秒）
    images: [ // 要展示的图片数组
      'https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/banner/by1.webp',
      'https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/banner/by5.jpg',
      'https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/banner/by3.jpg'
    ],
    index: 0,
    rate1: 4,
    reserveinfo: [
      
  
    ]
   
  },
  onLoad() {

    let self=this;

    my.request({
      url: 'https://www.lufengxiangzhen.site/getticket',
      method: 'GET',
      success: function(res) {
        
        console.log(res.data)
        
        self.setData({
          reserveinfo:res.data

        })


      },
      fail: function(res) {
        console.error('请求失败:', res);
      }
    });
    



  },
  //点击预订执行的跳转
  yuding(e) {
    console.log('e', e)
    var tid = e.target.dataset.index;
    console.log(tid)



    
    my.navigateTo({
      url: '../confirm/confirm?tid='+tid,
        success: (res) => {
           
        },
        fail: (err) => {
            my.showToast({
              type: 'exception',
              content: '跳转失败',
              duration: 3000,
            });
        }
    });
    











  },











  
  handleChange(index) {
    this.setData({ index });
  },
  goToDetail(event) {
    const index = event.currentTarget.dataset.index; // 获取点击的轮播图索引
    // 根据索引执行相应的操作
    my.navigateTo({
      url: '/pages/detail/detail?index=' + index // 假设跳转到名为 detail 的页面，并将索引传递过去
    });
  },
 
});
