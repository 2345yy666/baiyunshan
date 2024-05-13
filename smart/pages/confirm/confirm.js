const { fail } = require("assert");

const initialValues = {
  account: '',
  password: '',
 

};
Page({
  data: {

    titleImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F8%2F672ef01e-e529-4c0b-9faa-8131b844f6c7.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651035634&t=9e1690858e3c1af077b4ec86fe06e058',
    value: 1,       //购买门票数量
    list: [
   
      { type: 'light' }
    ],
    ticketinfo:[],
    

    form: 'form',
    initialValues,
    oneprice:0,
    sumprice:0,

    today: '', // 今天的日期
    tomorrow: '', // 明天的日期
    dayAfterTomorrow: '', // 后天的日期

   
      yname:"",       //名字
      ynumber:"",     //手机号
      yid:"",         //身份证号
   

    nameshow:false,
    phoneshow:false,
    idshow:false,
    tid:0,


    select:"noselect",
    select1:"selected",
    select2:"selected",

    selected:"selected",


    uid:"",
    calendarValue: '', // 日历默认日期
    calendarVisible: false // 日历弹窗组件显示

  },

  //预约日期
  handleClick() {
    this.setData({
      calendarVisible: !this.data.calendarVisible
    })
  },
  handleCalendarConfirm(e) {
    this.setData({
      calendarValue: e.value
    })
  },
  //预约日期




  bindInput(e){
    var inputValue = e.detail.value;
   this.setData({

    yname:inputValue

   })
},

bindInput2(e){
  var inputValue = e.detail.value;
 this.setData({

  ynumber:inputValue

 })
},

bindInput3(e){
  var inputValue = e.detail.value;
 this.setData({

  yid:inputValue

 })
},





changeselect1(){

  this.setData({

    select:"noselect",
    select1:"selected",
    select2:"selected",
   })


},

changeselect2(){

  this.setData({

    select:"selected",
    select1:"noselect",
    select2:"selected",
   })


},

changeselect3(){

  this.setData({

    select:"selected",
    select1:"selected",
    select2:"noselect",
   })


},














  onLoad(query) {

    console.log("当前时间"+this.getCurrentDateTime())
    console.log("当前UUID"+this.generateUUID())
    var tid = query.tid;
    this.setData({
      tid:tid
    })
    this.syncDate(); // 同步日期
    this.getinit(tid)
    // 初始化时计算总价
    this.calculateTotalPrice();

    //获取storage的uid
    my.getStorage({
      key: 'loginuser',
      success: (res) => {
        console.log(res);
       this.setData({
        uid:res.data.uid
       })
      },
     
    });


  },


 
    //初始化信息
    getinit(tid){
      let self=this;
      my.request({
        url: 'https://www.lufengxiangzhen.site/gettickone?tid='+tid,
        method: 'GET',
        success: function(res) {
          console.log('请求成功:', res.data);
          self.setData({

            ticketinfo:res.data,
            oneprice:res.data.price,
            sumprice:res.data.price

          })
        },
        fail: function(res) {
          console.error('请求失败:', res);
        }
      });
    },



    //判断填写游客信息逻辑

    judgeykl(){

      var name = this.data.yname;
      var phone = this.data.ynumber;
      var pid = this.data.yid;
  
      var anyEmpty = false; // Flag to check if any field is empty
      var invalidPhoneLength = false; // Flag to check if phone length is invalid
      var invalidPIDLength = false; // Flag to check if PID length is invalid
      var invalidNameLength = false; // Flag to check if name length is invalid
  
      if (name === "") {
          this.setData({
              nameshow: true
          });
          anyEmpty = true;
      } else if (name.length < 2) {
          this.setData({
              nameshow: true
          });
          invalidNameLength = true;
      } else {
          this.setData({
              nameshow: false
          });
      }
  
      if (phone === "") {
          this.setData({
              phoneshow: true
          });
          anyEmpty = true;
      } else if (phone.length !== 11) {
          this.setData({
              phoneshow: true
          });
          invalidPhoneLength = true;
      } else {
          this.setData({
              phoneshow: false
          });
      }
  
      if (pid === "") {
          this.setData({
              idshow: true
          });
          anyEmpty = true;
      } else if (pid.length !== 18) {
          this.setData({
              idshow: true
          });
          invalidPIDLength = true;
      } else {
          this.setData({
              idshow: false
          });
      }
  
     
      if (anyEmpty || invalidPhoneLength || invalidPIDLength || invalidNameLength) {
          return false;
      }
  
     
      return true;
    },


    //获取当前时间
     getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },



    //获取UUID
    generateUUID() {
      const timestamp = new Date().getTime().toString(); // 获取当前时间戳
      const random = Math.random().toString().substr(2, 12); // 生成随机数并截取部分
      const uuid = timestamp + random; // 组合成UUID
      return uuid;
    },




       //支付


    payticket: function() {
      var self=this
      this.judgeykl();
      var oid=self.generateUUID();
    
    

      var price=self.data.sumprice
      var subject=self.data.ticketinfo.tname
      
      if(this.judgeykl()==false){
          my.alert({

            content:"请完善游客信息"

          })
      }else{

        my.request({

          url:"https://www.lufengxiangzhen.site/sandboxpay?subject="+subject+"&price="+price,
          success:function(info){
            console.log(info)
            var tradeno=info.data.alipay_trade_create_response.trade_no
            
            var parmsucess={
              orderitem: {
                // orderitem 相关的数据
                tk_orderitemprice: self.data.sumprice,
                tk_orderitemtickets: self.data.tid,
                tk_orderid: oid,
                tk_orderitemUserid: self.data.uid,
                tk_orderitemUsermessage: "备注",
                apply_time: self.getCurrentDateTime(),
                start: 1,
                ticket_number: "A2B3C3"
            },
            order: {
                // order 相关的数据
                oid: oid,
                tid: self.data.tid,
                buy_time: self.getCurrentDateTime(),
                uid: self.data.uid,
                buy_mode: 1,
                num: self.data.value,
                prices: self.data.sumprice,
                status:1,
                tradeNo:tradeno
            }
        
        
              };








            my.tradePay({
              // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
              tradeNO: tradeno,
              success: (res) => {
              
                
               console.log(res)
                if(res.resultCode==9000){
    
                  my.request({
                    url: 'https://www.lufengxiangzhen.site/insertorder',
                    method: 'POST',
                    data:parmsucess,
                    dataType: "json",
                    contentType: "multipart/form-data",
                    success: function(res) {
                      console.log('请求成功:', res.data);
                      
                      my.navigateTo({
      
                        url:"/pages/paysucess/paysucess?oid="+oid
                      })
                    },
                    fail: function(res) {
                      console.error('请求失败:', res);
                    }
                  });
    
    
                 
                }else{
                  var parm = {
                    orderitem: {
                        // orderitem 相关的数据
                        tk_orderitemprice: self.data.sumprice,
                        tk_orderitemtickets: self.data.tid,
                        tk_orderid: oid,
                        tk_orderitemUserid: self.data.uid,
                        tk_orderitemUsermessage: "备注",
                        apply_time: self.getCurrentDateTime(),
                        start: 0,
                        ticket_number: "A2B3C3"
                    },
                    order: {
                        // order 相关的数据
                        oid: oid,
                        tid: self.data.tid,
                        buy_time: self.getCurrentDateTime(),
                        uid: self.data.uid,
                        buy_mode: 1,
                        num: self.data.value,
                        prices: self.data.sumprice,
                        status:0,
                        tradeNo:tradeno
                    }
                    };
                    
                  my.request({
                    url: 'https://www.lufengxiangzhen.site/insertorder',
                    method: 'POST',
                    data:parm,
                    dataType: "json",
                    contentType: "multipart/form-data",
                    success: function(res) {
                      console.log('请求成功:', res.data);
                      my.navigateTo({
                 
                        url:"/pages/orderconfirm/orderconfirm?oid="+oid
                        
                      })
                    },
                    fail: function(res) {
                      console.error('请求失败:', res);
                    }
                  });
    
    
    
                 
                }
                
               
                
               
              },
              fail: (res) => {
              
                
                my.navigateTo({
                 
                  url:"/pages/orderconfirm/orderconfirm?oid="+oid
                })
                
              },
              
              complete:function(res){
              
                
    
              }
    
              
    
    
            });






            //发起交易结束

          },
          fail:function(){

          }


        })
        
       
        

      }
     

      




    },

  


  //步进器
  handleChange(value, dataSet) {
    this.setData({ 
      value:value 
    
    });
    this.calculateTotalPrice();
  },
  handleAddValue() {
    console.log(6666)
    debugger
    this.setData({ 
      value: this.data.value + 1 ,
    });
    console.log(this.data.value)
    this.calculateTotalPrice();
  },
  handleMinusValue() {
    console.log(6666)
    debugger
    this.setData({ 
      value: this.data.value - 1 ,
    });
    console.log(this.data.value)
   this.calculateTotalPrice();
  },

  //

  handleTap(e) {
    console.log('e', e)
    my.alert({
      title: '点击按钮'
    })
  },
  handleValuesChange(value, values) {
    console.log(value, values);
  },
  handleSubmit(e) {
    my.alert({ title: '提交', content: JSON.stringify(e) });
  },
  getForm(ref) {
    this.formRef = ref;
  },
  handleSetValue() {
    this.formRef.setFieldsValue(this.data.form, initialValues);
  },



   // 计算总价的函数
   calculateTotalPrice() {
    this.setData({ 
      sumprice: this.data.value * this.data.oneprice
    });
  },



  //计算日期
  syncDate: function () {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 将日期设置为明天
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2); // 将日期设置为后天

    // 格式化日期为 MM-DD
    const formatDate = date => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}-${day}`;
    };

    this.setData({
      today: formatDate(today),
      tomorrow: formatDate(tomorrow),
      dayAfterTomorrow: formatDate(dayAfterTomorrow),
    });
  },


});
