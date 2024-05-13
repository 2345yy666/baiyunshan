

import QRCode from '/node_modules/qrcode'



Page({

  data: {
    imgSrc: '',
    barcodeImg: '',
    image:""
  },


  onReady(){

   


  },

  onLoad() {
   
   
    this.generateBarcode();
    
  },



  generateBarcode() {
    var self=this
    my.generateImageFromCode ({
      code: 'http://www.lufengxiangzhen.site/demo',
      format: 'BARCODE',
      width: 200,
      height: 100,
      success: function (res) {
        console.log (res.image);
        self.setData({

          image:res.image

        })
      },
      fail: function (err) {
        console.log (err);
      },
    });
  },









  getAuthCode() {
    my.getAuthCode({
      scopes: 'auth_base',//静默授权
      success: res => {
        const authCode = res.authCode;
        console.log(authCode)
        my.alert({
          content:authCode
        })
        my.request({
          url: 'http://111.231.8.83:8080/zhihuijingquapi-0.0.1-SNAPSHOT/auth?authcode='+authCode,
          method: 'GET',
        
          success: function (res) {
            my.alert({ content: res });
            console.log(res)

          },
          fail: function (error) {
            console.error('fail: ', JSON.stringify(error));
          },
         
        });
       
      fail: err => {
        console.log('my.getAuthCode 调用失败', err)
      }
  }});
  },



  

  
  getrequest(){
    my.getAuthCode({
      scopes: 'auth_user',
      success: (res) => {
        console.log(res.authCode);
       
        my.getOpenUserInfo({
          authCode: res.authCode,
          
          success: (userInfo) => {
            const { nickName, avatar } = JSON.parse(userInfo.response).response;
            my.alert({
              title: '用户信息',
              content: `昵称：${userInfo.nickName}\n头像：${avatar}`,
            });
          },
          fail: (error) => {
            if (error.error === 40003) { // 无效的授权关系
              my.alert({
                title: '获取用户信息失败',
                content: '授权信息已失效，请重新授权',
              });
            } else {
              my.alert({
                title: '获取用户信息失败',
                content: error.errorMessage || '未知错误',
              });
            }
          }
        });
      },
      fail: (error) => {
        console.error(error);
      }
    });
    
  },









  
  getUserInfo(){
    my.getOpenUserInfo({
      fail: (err) => {
         console.log('获取用户信息失败: ', err);
      },
      success: (res) => {
        let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
         console.log('获取用户信息-suc: ', userInfo);
      }
    });
  },

  
  getrequest(){


    console.log("env"+my.env.clientEnv)
    if(my.env.clientEnv=="sandbox"){
      my.alert({
        content:"沙箱"
      })


      this.getAuthCode();




    }
    if(my.env.clientEnv=="prod"){
      my.alert({
        content:"真机"
      })
    }

  },


  getrequestdemo(){

    my.request({
      url: 'http://localhost:8080/zhihuijingquapi/auth?authcode='+123,
      method: 'GET',
     

      success: function (res) {
        my.alert({ content: 'success' });
        console.log(res)
      },
      fail: function (error) {
        console.error('fail: ', JSON.stringify(error));
      },
     
    });
   
  },
  

  ddmf(){
    let self = this;
    
          

            QRCode.toString("http://localhost:8080/zhihuijingquapi/uppaysucess?oitid=38", { type: 'svg' }, function (err, url) {
              if (err) {
                console.error('生成二维码失败:', err);
                return;
              }
              
              // 将 SVG 字符串转换为 data URL 格式
              let str = 'data:image/svg+xml;base64,' + Buffer.from(url).toString('base64');
              
              self.setData({
                imgSrc: str
              });
            });
           




          
        


  },

      
     
   
    

  


  getjsqpi(){

  my.request({
    url: 'https://www.lufengxiangzhen.site/demo',//须加httpRequest域白名单
    method: 'GET',
   
    
    success: function(res) {
     console.log(res)
      my.tradePay({
        // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        tradeNO: res.data.out_trade_no,
        success: (resd) => {
         console.log(resd)
        },
        fail: (res) => {
          console.log(res)
        }
      });
    },
    fail: function(res) {
      my.alert({content: 'fail'});
    },
    
  });










  }

  
})
