Component({
  data: {
    selected: 0,
    tabBar: {
      textColor: "#0e932e",
      selectedColor: "#49a9ee",
      items: [
        {
          pagePath: "/pages/index/index",
          name: "首页",
          icon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/Scenic_Spot.png",
          activeIcon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/Scenic_Spot.png",
        },
        {
          pagePath: "/pages/index2/index2",
          name: "服务",
          icon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/服务.png",
          activeIcon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/服务.png",
        },
        {
          pagePath: "/pages/ticketlist/ticketlist",
          name: "票务预订",
          icon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/门票.png",
          activeIcon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/门票.png"
        },
        {
          pagePath: "/pages/order/order",
          name: "订单",
          icon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/订单.png",
          activeIcon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/订单.png",
        },
        {
          pagePath: "/pages/user/user",
          name: "我的",
          icon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/我的.png",
          activeIcon: "https://mp-e48a8988-7fa3-4691-bf31-127c9fc90a4c.cdn.bspapp.com/image/icon/我的.png",
        }
      ]
    }
  },
  methods: {
    switchTab(e) {
      const {dataset: { item: { pagePath = '' }} = {}} = e.target
      my.switchTab({
        url: pagePath
      })
    }
  }
});