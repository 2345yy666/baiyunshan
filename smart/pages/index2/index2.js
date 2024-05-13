Page({
  data: {







      servicelist:[

        {image:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/Snipaste_2024-04-18_10-59-04.png",title:"在线投诉",content:"在线提交投诉信息"},
        {image:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/Snipaste_2024-04-18_10-59-14.png",title:"电话投诉",content:"一键拨打投诉热线"},
        {image:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/Snipaste_2024-04-18_10-59-21.png",title:"电话咨询",content:"一键拨打咨询热线"},
        {image:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/Snipaste_2024-04-18_10-59-35.png",title:"一键救援",content:"一键求助紧急救援"}

      ]








  },
  onLoad() {

    



  },


  onUnload(event){ //多层级跳转之后，监听左上角返回事件，直接退回到index
                    my.switchTab({
                        url:"/pages/index/index"
                    })
                },


  onShow() {
    // 页面显示

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }

  },
});
