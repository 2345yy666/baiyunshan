Page({
  data: {

    sizes: ['x-small', 'small', 'medium', 'large'],
    images: [
      'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9',
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    ],
   
    userimage:"https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/toux.jpg",
    username:"登录",

  },
  onLoad() {


      this.setuser()

  },

  //获取用户信息
  setuser(){

    var self=this;
    my.getStorage({
      key: 'loginuser',
      success: (res) => {
        console.log(res);
        self.setData({

          userimage:res.data.image,
          username:res.data.name

        })


      },
      fail: (err) => {
        console.log(err)
      }
    });

  },

  onShow() {
    // 页面显示

    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4,
      });
    }

   

  },



   generateTenDigitUUID() {
    let uuid = '';
  const chars = '0123456789';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    uuid += chars.charAt(randomIndex);
  }

  return uuid;
  },

  getUserInfo(){
    var self=this
    let uid=self.generateTenDigitUUID()
    console.log(this.data.username)


    if(this.data.username==="登录"){
      my.getOpenUserInfo({
        fail: (err) => {
           console.log('获取用户信息失败: ', err);
        },
        success: (res) => { 
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
           console.log('获取用户信息-suc: ', userInfo);


           my.request({


            url:"https://www.lufengxiangzhen.site/insertuser",
            method: 'POST',
            data:{
              uid:uid,
              name:userInfo.nickName,
              gender:"男",
              
    
            },
            dataType: "json",
            contentType: "multipart/form-data",
            success: function(res) {
              console.log('请求成功:', res.data);

              my.setStorage({
                key: 'loginuser',
                data: {
                 name:userInfo.nickName,
                 image:userInfo.avatar,
                 uid:uid
                },
              });


             
            },
            fail: function(res) {
              console.error('请求失败:', res);
            }
    
           })




         
  
         



           self.setData({
  
            userimage:userInfo.avatar,
            username:userInfo.nickName
  
           })


          
  
  
        }
      });
    }else{

     
    }


 
  },



});
