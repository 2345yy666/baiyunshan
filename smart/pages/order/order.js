Page({
  data: {
    index: 0,

    orderlist:{},
    uid:"",
    orderlistone:{},
    orderlisttwo:{},
    orderlistthree:{},
    orderlistfour:{}
  },
  handleChange(index) {
    this.setData({ index });
  },

  onLoad(){

    
   
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
      });
    }
    // 页面显示
    this.getstorage();
    this.getorderinit();
    this.getorderbystatus();
    this.getorderbystatustwo();
    this.getorderbystatusthree();
    this.getorderbystatusfour();
   

  },

  getstorage(){
    var self=this
    let res = my.getStorageSync({ key: 'loginuser' });
    console.log(res);
    self.setData({
      uid:res.data.uid

    })

  },

  getorderinit(){
    var self=this
    console.log(self.data.uid)
    my.request({
      url: 'https://www.lufengxiangzhen.site/getorder?uid='+self.data.uid, // 请求的URL
    
      success: function(res) {
        // 请求成功的回调函数
        console.log('请求成功', res.data);
        
        self.setData({

          orderlist:res.data

        })
      },
      fail: function(res) {
        // 请求失败的回调函数
        console.log('请求失败', res);
      },
      complete: function(res) {
        // 不管请求成功或失败都会执行的回调函数
        console.log('请求完成', res);
      }
    });


  },

  getorderbystatus(){
    var self=this
    console.log(self.data.uid)
    my.request({
      url: 'https://www.lufengxiangzhen.site/gettickonestatus?uid='+self.data.uid+"&status=0", // 请求的URL
    
      success: function(res) {
        // 请求成功的回调函数
        console.log('请求成功', res.data);
        
        self.setData({

          orderlistone:res.data

        })
      },
      fail: function(res) {
        // 请求失败的回调函数
        console.log('请求失败', res);
      },
      complete: function(res) {
        // 不管请求成功或失败都会执行的回调函数
        console.log('请求完成', res);
      }
    });


  },

 


  getorderbystatustwo(){
    var self=this
    console.log(self.data.uid)
    my.request({
      url: 'https://www.lufengxiangzhen.site/gettickonestatus?uid='+self.data.uid+"&status=1", // 请求的URL
    
      success: function(res) {
        // 请求成功的回调函数
        console.log('请求成功', res.data);
        
        self.setData({

          orderlisttwo:res.data

        })
      },
      fail: function(res) {
        // 请求失败的回调函数
        console.log('请求失败', res);
      },
      complete: function(res) {
        // 不管请求成功或失败都会执行的回调函数
        console.log('请求完成', res);
      }
    });


  },


  getorderbystatusthree(){
    var self=this
    console.log(self.data.uid)
    my.request({
      url: 'https://www.lufengxiangzhen.site/gettickonestatus?uid='+self.data.uid+"&status=2", // 请求的URL
    
      success: function(res) {
        // 请求成功的回调函数
        console.log('请求成功', res.data);
        
        self.setData({

          orderlistthree:res.data

        })
      },
      fail: function(res) {
        // 请求失败的回调函数
        console.log('请求失败', res);
      },
      complete: function(res) {
        // 不管请求成功或失败都会执行的回调函数
        console.log('请求完成', res);
      }
    });


  },
  getorderbystatusfour(){
    var self=this
    console.log(self.data.uid)
    my.request({
      url: 'https://www.lufengxiangzhen.site/gettickonestatus?uid='+self.data.uid+"&status=3", // 请求的URL
    
      success: function(res) {
        // 请求成功的回调函数
        console.log('请求成功', res.data);
        
        self.setData({

          orderlistfour:res.data

        })
      },
      fail: function(res) {
        // 请求失败的回调函数
        console.log('请求失败', res);
      },
      complete: function(res) {
        // 不管请求成功或失败都会执行的回调函数
        console.log('请求完成', res);
      }
    });


  },














  //点击订单跳转
  chaksd(event){
    const oid = event.currentTarget.dataset.oid;
    console.log(oid)
    my.navigateTo({


      url:"/pages/orderconfirm/orderconfirm?oid="+oid

    })

  },


  chaksdsucess(event){
   
    const oid = event.currentTarget.dataset.oid;
    console.log(oid)
    my.navigateTo({


      url:"/pages/orderconfirmsucess/orderconfirmsucess?oid="+oid

    })

  


},

chaksdtuiding(event){
  const oid = event.currentTarget.dataset.oid;
  console.log(oid)
  my.navigateTo({


    url:"/pages/orderconfirmtuiding/orderconfirmtuiding?oid="+oid

  })
},




  usep(event){

    const oid = event.currentTarget.dataset.oid;
    console.log(oid)
    
    my.navigateTo({


      url:"/pages/paysucess/paysucess?oid="+oid

    })
    

  }


});
