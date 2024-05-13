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

    array: [
      { imageSrc: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/banner/by3.jpg", text: "白云山" },
      { imageSrc: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/u=999786646,1871046047&fm=253&fmt=auto&app=120&f=JPEG.webp", text: "景点介绍" },
      { imageSrc: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/by2.webp", text: "旅游攻略" },
      { imageSrc: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/u=1387743531,206277164&fm=30&app=106&f=JPEG.jpg", text: "预订服务" },
      // 添加更多的数据项
    ],
    scency:[

      {image:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/u=909935938,71732200&fm=253&fmt=auto&app=120&f=JPEG.webp",text:"白云山景区"},
     

    ],
    statusBarHeight:0,
    titleBarHeight:0,

  },


  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    my.setNavigationBar({   
      
      backgroundColor: '#ffffff', // 设置导航栏背景颜色为白色
      textColor: '#000000', // 设置导航栏文字颜色为黑色
    });
    //page.js  
  my.getSystemInfo({   
  success: (res) => {    
  this.setData({       
      'statusBarHeight': res.statusBarHeight,//状态栏高度                  
      'titleBarHeight': res.titleBarHeight,//标题栏高度              
      })   
} 
});


  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }

  },

  goToDetail(event) {
    const index = event.currentTarget.dataset.index; // 获取点击的轮播图索引
    // 根据索引执行相应的操作
    my.navigateTo({
      url: '/pages/detail/detail?index=' + index // 假设跳转到名为 detail 的页面，并将索引传递过去
    });
  },


  //点击白云山景区执行跳转
  tosceney(){
    my.navigateTo({
      url: '../reserve/reserve',
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


  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
