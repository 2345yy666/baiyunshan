
import { fail } from 'assert';
import QRCode from '/node_modules/qrcode'
Page({
  data: {


    statusBarHeight:0,
    titleBarHeight:0,
    oid:"",
    orderinfoone:{},
    orderinfooneotim:{},
    imgSrc: '',
    imgtxm:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/69f5f5b848cbeb60a916c39b436c3c7.png",
    oitid:0,


    position: '',
    basicShow: false,
    maskClosable: true,
    showCloseIcon: true,
    animation: true,
    autoHeight: false,
    showCenterScoll: false,
    showCenterDisableScoll: false,







  },


  //poup弹出层
  handlePopupClose() {
    this.setData({
      basicShow: false,
      showCenterScoll: false,
      showCenterDisableScoll: false,
    });
  },
  handleShowBasic(e) {
    const { position } = e.target.dataset;
    this.setData({
      position,
      basicShow: true,
    });
  },
  handleShowDisableScroll() {
    this.setData({
      showCenterDisableScoll: true,
    });
  },
  handleShowScroll() {
    this.setData({
      showCenterScoll: true,
    });
  },
  handleChangeMaskClosable(checked) {
    const { showCloseIcon } = this.data;
    if (!showCloseIcon && !checked) {
      return my.alert({
        content: '同时隐藏关闭按钮和蒙层关闭事件将无法关闭弹出层',
      });
    }
    this.setData({ maskClosable: checked });
  },
  handleChangeShowCloseIcon(checked) {
    const { maskClosable } = this.data;
    if (!maskClosable && !checked) {
      return my.alert({
        content: '同时隐藏关闭按钮和蒙层关闭事件将无法关闭弹出层',
      });
    }
    this.setData({ showCloseIcon: checked });
  },
  handleChangeAnimation(checked) {
    this.setData({ animation: checked });
  },
  handleChangeAutoHeight(checked) {
    this.setData({ autoHeight: checked });
  },


  refund(){

      this.handleButtonClick();

  },
   handleButtonClick() {


    var self=this
    var oid=self.data.oid

    // 显示加载动画
    my.showLoading({
        content: '退款中...', // 加载提示文字
    });

    // 延迟3秒后执行代码
    setTimeout(function() {
        // 在这里写你想执行的代码

        // 隐藏加载动画
        my.hideLoading();
        my.request({

          url:"http://www.lufengxiangzhen.site/refund?oid="+oid,
          method:"GET",
          success:function(res){

            my.showToast({
              type: 'success',
              content: '退款成功',
              duration: 2000 // 提示持续时间为2秒
            });

            my.navigateBack({
              success: function(res) {
                // 返回成功的回调函数
                console.log('返回成功');
              },
              fail: function(err) {
                // 返回失败的回调函数
                console.log('返回失败', err);
              }
            });
            
          },
          fail:function(res){
            my.showToast({
              type: 'success',
              content: '退款失败',
              duration: 2000 // 提示持续时间为2秒
            });
          },
          complete:function(){
            self.setData({
              basicShow:false
            })
          }


        })

       
       

    }, 3000); // 延迟时间为3秒
    
   


},







  onLoad(queary) {
    var self=this
    var oid=queary.oid
    
    self.setData({
        oid:oid

    })
    this.getorderinfoone(oid)
   
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


  getorderinfoone(oid){
    var self=this;
    my.request({

      url:"https://www.lufengxiangzhen.site/selectorderone?oid="+oid,
      method:"GET",

      success:function(res){
        console.log(res)
        self.setData({

          orderinfoone:res.data,
          orderinfooneotim:res.data.oitem,
          oitid:res.data.oitem.tk_orderitemid
        })

      },
      fail:function(){

      }

    })
    this.ddmf();

  },



  ddmf(){
    let self = this;

     var c=this.data.orderinfooneotim;
     console.log(c)
          

            QRCode.toString("http://localhost:8080/zhihuijingquapi/uppaysucess?oitid=37", { type: 'svg' }, function (err, url) {
              if (err) {
                console.error('生成二维码失败:', err);
                return;
              }
              
              // 将 SVG 字符串转换为 data URL 格式
              let str = 'data:image/svg+xml;base64,' + Buffer.from(url).toString('base64');
              
              self.setData({
                imgSrc: str
              });
            })


  },



});
