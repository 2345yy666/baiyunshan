Page({
  data: {},
  onLoad() {

   

  },


  fasong(){

    console.log("开始")



    
    my.request({
      url: 'http://111.231.8.83:8080/zhihuijingquapi-0.0.1-SNAPSHOT/getpay?tradeno=1241241231231221312',
      method: 'GET',
      dataType:"text",
      success: function(res) {
        console.log('请求成功:', res.data);

        my.tradePay({
          // 调用接口返回的orderStr
          orderStr:"",
          success: (res) => {
            my.alert({
            content: JSON.stringify(res),
          });
          },
          fail: (res) => {
            my.alert({
            content: JSON.stringify(res),
           
          });
          console.log(res);
          }
        });



      },
      fail: function(res) {
        console.error('请求失败:', res);
      }
    });



    

  },

  fasong2(){
    my.tradePay({
      // 调用接口返回的orderStr
      orderStr:"alipay_sdk=alipay-sdk-java-4.39.52.ALL&app_id=9021000135644929&biz_content=%7B%22total_amount%22%3A12%2C%22subject%22%3A%22123%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=UTF-8&format=JSON&method=alipay.trade.app.pay&sign=RY9y1A6fNF1wTRYisi%2FT5TwV%2FOIh%2BFjt2BlkPwkd%2BhSxFQdjOCPbtaqxVheDF0%2BBloKPrNJGLx2924Kp00xvJIcv3sfrLndN2lbPABwbrkNkOaszvZhB8392oXznB1MIx1tdUCwC1NOltQ3ouN%2FwOi6yLnKWOkP4CJVjbbfgnX%2B33PCj9szeCgFpaPmvwIYePPt0JSIC5zbbXaoYHy2bosKLfRzYH4iMbCgGHmoq3FHlsjJht051Let0cc1LLibSaGRx27xpw5j1vm3Riv7Q74jBj7OWuBjj4uD%2BapfmOuNm%2BZ9abk3sFvESYpjBMUJLoo1vaOpuBoiADEBElZHWjQ%3D%3D&sign_type=RSA2&timestamp=2024-05-07+09%3A34%3A52&version=1.0",
      success: (res) => {
        my.alert({
        content: JSON.stringify(res),
      });
      },
      fail: (res) => {
        my.alert({
        content: JSON.stringify(res),
       
      });
      console.log(res);
      }
    });
  },


 
  

  

});
