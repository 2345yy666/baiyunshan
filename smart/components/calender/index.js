/* eslint-disable */
Component({
  externalClasses: ['custom-class'],
  options: {
    // 允许基础库识别 lifetimes 字段以支持 lifetimes 功能
    // lifetimes: true,
    observers: true
  },
  props: {
    type: 'range', // single表示单选，range表示选择日期区间,single未开放
    monthTranslate: {}, // 日历上的红蓝点
    visible: false,
    isTabbar: false, // tabbar页面不增加底部安全区域
    bgColor: '#FFF',
    value: '',
    limitTime: 90,
    onChangeTime: () => { },
    onGetCalendarTime: () => { }
  },
  data: {
    dateList: [],
    showYear: '', // 页面上展示的年
    showMonth: '', // 页面上展示的月
    showDay: '', // 页面上展示的日
    startSelectYear: '', // 开始选中的年
    startSelectMonth: '', // 开始选中的月
    startSelectDay: 0, // 开始选中的日
    currentYear: '', // 当前年
    currentMonth: '', // 当前月
    currentTime: new Date().toLocaleDateString(), // 当前年月日
    startTimestamp: '', // 开始的时间戳
    endTimestamp: '', // 结束的时间戳
    showTimestamp: '' // 当前时间戳
  },
  onInit() {
    this.initComponentStart()
  },
  observers: {
    monthTranslate() {
      this.data.dateList.some(val => {
        Object.keys(this.data.monthTranslate).some(item => {
          if (val.label * 1 === item) {
            val.status = this.data.monthTranslate[item].toString()
            delete this.data.monthTranslate[item]
            return
          }
        })
        if (!Object.keys(this.data.monthTranslate).length) {
          return
        }
      })
      this.setData({
        dateList: this.data.dateList
      })
    },
    visible(val) {
      if (val) {
        if (this.props.value) {
          let arr = []
          if (this.props.value.indexOf('~') >= 0 || this.props.value.indexOf(',') >= 0) {
            if (this.props.value.indexOf('~') >= 0) {
              arr = this.props.value.replace(/-/g, '/').split('~')
            }
            if (this.props.value.indexOf(',') >= 0) {
              arr = this.props.value.replace(/-/g, '/').split(',')
            }
            this.setData({
              showYear: new Date(arr[0]).getFullYear(),
              showMonth: new Date(arr[0]).getMonth() + 1,
              startTimestamp: new Date(arr[0]).getTime(),
              endTimestamp: new Date(arr[1]).getTime()
            }, () => {
              this.getDay()
            })
          } else {
            this.setData({
              showYear: new Date(this.props.value).getFullYear(),
              showMonth: new Date(this.props.value).getMonth() + 1,
              startTimestamp: new Date(this.props.value).getTime(),
              endTimestamp: new Date(this.props.value).getTime(),
            }, () => {
              this.getDay()
            })
          }
        } else {
          this.initComponentStart()
        }
      }
    }
  },
  methods: {
    // 初始化组件
    initComponentStart() {
      const now = new Date()
      const startTimestamp = Date.parse(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      this.setData({
        currentYear: now.getFullYear(),
        currentMonth: now.getMonth() + 1,
        showTimestamp: startTimestamp,
        startTimestamp,
        endTimestamp: startTimestamp
      })
      this.props.onGetCalendarTime({
        startTime: this.uDateFormat(startTimestamp),
        endTime: this.uDateFormat(startTimestamp)
      })
      this.getCurrentData()
      this.getDay()
    },
    handleClose() {
      this.props.onClose()
    },
    handleConfirm() {
      let { startTimestamp, endTimestamp } = this.data
      if (this.props.type === 'range') {
        if (startTimestamp && endTimestamp) {
          if (startTimestamp === endTimestamp) {
            return my.showToast({ content: '请选择时间范围', type: 'none' })
            // this.props.onConfirm({ value: this.uDateFormat(startTimestamp) })
          } else {
            this.props.onConfirm({ value: `${this.uDateFormat(startTimestamp)},${this.uDateFormat(endTimestamp)}` })
          }
        
          this.props.onClose()
        } else {
          my.showToast({ content: '请选择时间范围', type: 'none' })
        }
      } else {
        this.props.onConfirm({ value: this.uDateFormat(startTimestamp) })
       
        this.props.onClose()
      }
    },
    
    getDay() {
      const {
        showYear,
        showMonth,
        showDay
      } = this.data
      var firstDay = new Date(`${showYear}/${showMonth}/1`).getDay() // 获得每月1号是星期几
      let days = new Date(showYear, showMonth, 0).getDate() // 获取当月多少天
      this.data.dateList = []
      for (let s = 1; s <= firstDay; s++) {
        this.data.dateList.push({
          label: '',
          timestamp: 0
        })
      }
      for (let i = 1; i <= days; i++) {
        this.data.dateList.push({
          label: i < 10 ? '0' + i : i,
          timestamp: new Date(`${showYear}/${showMonth}/${i}`).getTime()
        })
      }
      this.setData({
        dateList: this.data.dateList,
        showYear,
        showMonth
      })
      if (!this.data.startSelectYear) {
        this.data.startSelectYear = showYear
        this.data.startSelectMonth = showMonth
        this.data.startSelectDay = showDay
      }
      this.props.onChangeTime({
        showYear,
        showMonth
      })
    },
    getCurrentData() { // 获取当前日期，初始化使用
      const date = new Date()
      this.data.showYear = date.getFullYear()
      this.data.showMonth = date.getMonth() + 1
      this.data.showDay = date.getDate()
    },
    getNextMonth() { // 获取下个月
      if (this.data.showMonth < 12) {
        this.data.showMonth += 1
      } else {
        this.data.showMonth = 1
        this.data.showYear += 1
      }
      this.getDay()
    },
    getLastMonth() { // 获取上个月
      if (this.data.showMonth !== 1) {
        this.data.showMonth -= 1
      } else {
        this.data.showMonth = 12
        this.data.showYear -= 1
      }
      this.getDay()
    },
    selectDate(e) {
      const {
        date
      } = e.currentTarget.dataset
      if (!date) {
        return
      }
      const {
        showYear,
        showMonth,
        startSelectYear,
        startSelectMonth,
        startSelectDay,
        endTimestamp
      } = this.data
      const currentTimestamp = Date.parse(new Date(showYear, showMonth - 1, date * 1)) // 当前选中的时间戳
      if (this.data.type === 'single') { // 单选日期
        this.setData({
          startTimestamp: currentTimestamp,
          endTimestamp: currentTimestamp
        })
        this.props.onGetCalendarTime({
          startTime: this.uDateFormat(this.data.startTimestamp),
          endTime: this.uDateFormat(this.data.endTimestamp)
        })
        return
      }
      const startTimestamp = Date.parse(new Date(startSelectYear, startSelectMonth - 1, startSelectDay * 1)) // 已经选择的开始时间的时间戳
      if (this.data.startSelectYear === '' || currentTimestamp < startTimestamp || (currentTimestamp > startTimestamp && currentTimestamp < endTimestamp)) {
        this.setData({
          startTimestamp: currentTimestamp,
          endTimestamp: this.data.endTimestamp >= currentTimestamp ? this.data.endTimestamp : currentTimestamp
        })
        this.data.startSelectYear = showYear
        this.data.startSelectMonth = showMonth
        this.data.startSelectDay = date
        if (currentTimestamp > startTimestamp && currentTimestamp < endTimestamp) { // 如果选择了开始和结束日期中间的日期，则初始化日期
          this.setData({
            endTimestamp: currentTimestamp
          })
        }
        this.props.onGetCalendarTime({
          startTime: this.uDateFormat(this.data.startTimestamp),
          endTime: this.uDateFormat(this.data.endTimestamp)
        })
        return
      }
      this.setData({
        endTimestamp: currentTimestamp // 结束的时间戳
      })
      this.props.onGetCalendarTime({
        startTime: this.uDateFormat(this.data.startTimestamp),
        endTime: this.uDateFormat(this.data.endTimestamp)
      })
    },
    // 时间戳转日期时间格式: yyyy-MM-dd
    uDateFormat(timestamp) {
      return this.uMoment(timestamp).format('yyyy-MM-dd')
    },
    uMoment(timestamp) {
      const leftPad = (num) => {
        if (num < 10) {
          return `0${num}`
        }
        return `${num}`
      }
      const date = new Date(timestamp)

      return {
        format(pattern) {
          const str = typeof pattern === 'string' ? pattern : 'yyyy-MM-dd'
          if (!Number.isNaN(date.getTime())) {
            return str
              .replace(/yyyy/i, leftPad(date.getFullYear()))
              .replace(/MM/, leftPad(date.getMonth() + 1))
              .replace(/dd/i, leftPad(date.getDate()))
              .replace(/hh/i, leftPad(date.getHours()))
              .replace('mm', leftPad(date.getMinutes()))
              .replace(/ss/i, leftPad(date.getSeconds()))
          }
          return ''
        }
      }
    }
  }
})