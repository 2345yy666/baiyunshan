Page({
  data: {

    statusBarHeight:0,
    titleBarHeight:0,
    sumprice:145,
    countdownText: "30:00",
    remainingTime: 30 * 60, // 倒计时时长，单位：秒


    orderinfoone:{},
    orderinfooneotim:{},
    tradeno:""
  },
  onLoad(query) {
    var oid=query.oid
    var tradeno=query.tradeno
    this.setData({
      tradeno:tradeno
    })
    this.getorderinfoone(oid)
    this.startCountdown();
// 页面加载

my.setNavigationBar({   
  

  textColor: 'white', // 设置导航栏文字颜色为黑色
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

  onShow(){
    
  },
  


  getorderinfoone(oid){
    var self=this;
    my.request({

      url:"https://www.lufengxiangzhen.site/selectorderone?oid="+oid,
      method:"GET",

      success:function(res){
        console.log(res)
        self.setData({

          orderinfoone:res.data,
          orderinfooneotim:res.data.oitem
        })

      },
      fail:function(){

      }

    })

  },



  startCountdown: function () {
    const interval = setInterval(() => {
      if (this.data.remainingTime > 0) {
        const minutes = Math.floor(this.data.remainingTime / 60);
        const seconds = this.data.remainingTime % 60;
        this.setData({
          countdownText: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`,
          remainingTime: this.data.remainingTime - 1,
        });
      } else {
        clearInterval(interval);
        // 在倒计时结束时执行关闭订单的操作
        this.closeOrder();
      }
    }, 1000);
  },

  closeOrder: function () {
    // 关闭订单的逻辑
  },

  payticket2(){
    var self=this
    console.log("你要的订单号是"+self.data.orderinfoone.tradeNo)
    var tradeno=self.data.orderinfoone.tradeNo    //支付宝交易号
    var oid=self.data.orderinfoone.oid        //订单号
    my.tradePay({
        // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        tradeNO: tradeno,
        success: (res) => {
             if(res.resultCode==9000){
            
              //成功支付改变订单状态为已支付
              my.request({

                url:"https://www.lufengxiangzhen.site/continuepay?oid="+oid,
                method:"GET",
          
                success:function(res){
                  
                  my.switchTab({
                    url:"/pages/index/index"
                  })
          
                },
                fail:function(){
          
                }
          
              })


               

             }else{
              return
             }
        },
        fail: (res) => {
         
          my.alert({
            content: "付款失败...",
          });
        },
        
      });

    }


});
