<template>
  <div>
    <span class="arrow" :class="{ active: popShow }" />
    <div v-show="popShow" class="controls">
      <div class="control-text" @click="$emit('updateAction')">{{ $t(controlText) }}</div>
      <div class="control-label">{{ $t(controlLabel) }}</div>
      <div class="vm-btns">
        <div class="vm-btn control-text" @click.stop="getSelectData">
          {{ $t(confirmText) }}
        </div>
      </div>
    </div>

    <div
      class="vue-date-select-container"
      :class="{ 'vm-date-show': popShow }"
      @mousemove="handleTouch($event)"
      @mouseup="handleTouch($event)"
      @touchend="clearHover"
    >
      <div
        class="vm-dialog-content s"
        :style="{ 'margin-top': parseInt((windowHeight - 260) * 0.4) + 'px' }"
      >
        <div class="vm-wheels">
          <div
            v-for="(item, wheelIndex) in wheels"
            :key="wheelIndex"
            class="vm-wheel"
            @touchstart="handleTouch($event, wheelIndex)"
            @touchmove="handleTouch($event, wheelIndex)"
            @touchend="handleTouch($event, wheelIndex)"
            @mousedown="handleTouch($event, wheelIndex)"
            @mousewheel="handleTouch($event, wheelIndex)"
            @DOMMouseScroll="handleTouch($event, wheelIndex)"
          >
            <div class="vm-line" :style="{ borderColor: themeColor }" />
            <div
              class="vm-items-wrapper text-center"
              :class="{ anim: item.anim }"
              :style="{
                transform: 'translate3d(0,' + item.translateY + 'px, 0)',
                'transition-duration': item.anim ? item.transitionTime : '0s',
              }"
            >
              <div
                v-for="(optionItem, itemIndex) in item.data"
                :key="itemIndex"
                class="vm-option text-center"
                :class="wheelIndex === 1 ? 'bulan' : 'normal'"
                @click="handleSingleClick($event, wheelIndex, itemIndex)"
                @touchstart="hoverClass($event, wheelIndex, itemIndex)"
                @mousedown="hoverClass($event, wheelIndex, itemIndex)"
              >
                <span v-if="wheelIndex != 0">
                  {{ 10 > optionItem ? '0' + optionItem : optionItem }}
                </span>
                <span v-else>
                  {{ callBulan(wheelIndex, optionItem) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroller',
  props: {
    value: {
      type: String,
      default: '',
    },
    min: {
      type: String,
      default: '',
    },
    max: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputClass: {
      type: [String, Object, Array],
      default: '',
    },
    inputStyle: {
      type: [String, Object, Array],
      default: '',
    },
    themeColor: {
      type: String,
      default: '#03a9f4',
    },
    controlText: {
      type: String,
      default: 'common.next'
    },
    controlLabel: {
      type: String,
      default: null
    },
    confirmText: {
      type: String,
      default: 'common.done'
    }
  },

  data() {
    return {
      popShow: false,
      selectValue: '',
      selectNilai: '',
      wheels: [
        {
          type: 'month',
          translateY: 0,
          anim: false,
          transitionTime: '700ms',
          data: [],
        },
        {
          type: 'day',
          translateY: 0,
          anim: false,
          transitionTime: '700ms',
          data: [],
        },
        {
          type: 'year',
          translateY: 0,
          anim: false,
          transitionTime: '700ms',
          data: [],
        },
      ],
      startY: 0,
      moveY: 0,
      oldMoveY: 0,
      moveEndY: 0,
      offsetDistance: 0,
      offset: 0,
      oversizeBorder: 0,
      startTime: 0,
      liHeight: 40,
      minDate: '',
      maxDate: '',
      initDate: '',
      clickFlag: false,
      activeClick: {
        wheelIndex: -100,
        itemIndex: -100,
      },
      activeWheelIndex: 0,
      windowHeight: 300,
    }
  },
  computed: {
    hoverColor() {
      const hex = this.themeColor
      const opacity = 0.08
      let result = ''
      if (hex.replace(/\s+/g, '').length === 7) {
        result =
          'rgba(' +
          parseInt('0x' + hex.slice(1, 3)) +
          ',' +
          parseInt('0x' + hex.slice(3, 5)) +
          ',' +
          parseInt('0x' + hex.slice(5, 7)) +
          ',' +
          opacity +
          ')'
      } else {
        const rgb = hex.split('(')[1].split(')')[0].split(',')
        result =
          'rgba(' +
          rgb[0].trim() +
          ',' +
          rgb[1].trim() +
          ',' +
          rgb[2].trim() +
          ',' +
          opacity +
          ')'
      }
      return result || ''
    },
  },
  mounted() {
    this.initSetting()
    this.initOption()
    // initialise listener.
    this.initListener()
    this.popShow = true
  },
  methods: {
    initListener() {
      // const _this = this
      window.addEventListener(
        'resize',
        function () {
          this.windowHeight = 300
        },
        false
      )
    },
    initSetting() {
      this.initDate =
        this.value && this.checkIsFormatStr(this.value)
          ? this.value
          : this.getDateStr(new Date())
      this.maxDate =
        this.max && this.checkIsFormatStr(this.max)
          ? this.max
          : this.getDateStr(new Date(), 2)
      this.minDate =
        this.min && this.checkIsFormatStr(this.min)
          ? this.min
          : this.getDateStr(new Date(), -10)
    },
    initOption() {
      const maxDateObj = this.getDateStrObj(this.maxDate)
      const minDateObj = this.getDateStrObj(this.minDate)
      const initDateObj = this.getDateStrObj(this.initDate)
      for (let i = minDateObj.year; i <= maxDateObj.year; i++) {
        this.wheels[2].data.push(i)
      }
      for (let j = 1; j <= 12; j++) {
        this.wheels[0].data.push(j)
      }
      for (
        let k = 1;
        k <= this.calcDays(initDateObj.year, initDateObj.month);
        k++
      ) {
        this.wheels[1].data.push(k)
      }
      this.locateWheelByVal(this.initDate)
    },
    locateWheelByVal(dateString) {
      const minDateObj = this.getDateStrObj(this.minDate)
      const dateObj = this.getDateStrObj(dateString)
      this.wheels[2].translateY = this.getDistanceByIndex(
        dateObj.year - minDateObj.year
      )
      this.wheels[0].translateY = this.getDistanceByIndex(dateObj.month - 1)
      this.wheels[1].translateY = this.getDistanceByIndex(dateObj.day - 1)
    },
    descBulan(blnNum) {
      let returns = ''
      if (blnNum === '01' || blnNum === 1) {
        returns = 'January'
      } else if (blnNum === '02' || blnNum === 2) {
        returns = 'February'
      } else if (blnNum === '03' || blnNum === 3) {
        returns = 'March'
      } else if (blnNum === '04' || blnNum === 4) {
        returns = 'April'
      } else if (blnNum === '05' || blnNum === 5) {
        returns = 'May'
      } else if (blnNum === '06' || blnNum === 6) {
        returns = 'June'
      } else if (blnNum === '07' || blnNum === 7) {
        returns = 'July'
      } else if (blnNum === '08' || blnNum === 8) {
        returns = 'August'
      } else if (blnNum === '09' || blnNum === 9) {
        returns = 'September'
      } else if (blnNum === 10) {
        returns = 'October'
      } else if (blnNum === 11) {
        returns = 'November'
      } else if (blnNum === 12) {
        returns = 'December'
      }
      return returns
    },
    callBulan(status, numbers) {
    let returns = ''
      if (status === 0) {
        returns = this.descBulan(numbers)
      }
      return returns
    },
    getDateStrObj(dateString, offsetYear, offsetMonth, offsetDay) {
      const tempArr = dateString.split('-')
      return {
        year: ~~tempArr[0],
        month: ~~tempArr[1],
        day: ~~tempArr[2],
      }
    },
    addPrefix(num) {
      return num < 10 ? '0' + num : num
    },
    getDateStr(dateObj, offsetYear, offsetMonth, offsetDay) {
      const tempArr = []
      tempArr.push(dateObj.getFullYear() + (offsetYear || 0))
      tempArr.push(this.addPrefix(dateObj.getMonth() + 1 + (offsetMonth || 0)))
      tempArr.push(this.addPrefix(dateObj.getDate() + (offsetDay || 0)))
      return tempArr.join('-')
    },
    checkIsFormatStr(dateString) {
      if (dateString && typeof dateString === 'string') {
        const tempArr = dateString.split('-')
        if (tempArr.length > 2) {
          const year = ~~tempArr[0]
          const month = ~~tempArr[1]
          const day = ~~tempArr[2]
          if (
            year > 0 &&
            year < 10000 &&
            month >= 1 &&
            month <= 12 &&
            day >= 1 &&
            day <= this.calcDays(year, month)
          ) {
            return true
          }
        }
      }
      return false
    },
    getDistanceByIndex(index) {
      return (2 - index) * this.liHeight
    },
    getIndexByDistance(translateY) {
      return parseInt(-translateY / this.liHeight) + 2
    },
    getWheelData(wheelIndex) {
      let dataIndex = this.getIndexByDistance(
        this.wheels[wheelIndex].translateY
      )
      dataIndex = dataIndex < 0 ? 0 : dataIndex
      dataIndex =
        dataIndex >= this.wheels[wheelIndex].data.length
          ? this.wheels[wheelIndex].data.length - 1
          : dataIndex
      return this.wheels[wheelIndex].data[dataIndex]
    },
    calcDays(year, month) {
      return new Date(year, month, 0).getDate()
    },
    fixPosition(distance) {
      return Math.round(distance / this.liHeight) * this.liHeight
    },
    checkIsOverBorder(curWheelObj) {
      const _this = this
      this.oversizeBorder = -(curWheelObj.data.length - 3) * this.liHeight
      if (curWheelObj.translateY > 2 * this.liHeight) {
        setTimeout(function () {
          curWheelObj.transitionTime = '700ms'
          curWheelObj.translateY = 2 * _this.liHeight
        }, 100)
      } else if (curWheelObj.translateY < this.oversizeBorder) {
        setTimeout(function () {
          curWheelObj.transitionTime = '700ms'
          curWheelObj.translateY = _this.oversizeBorder
        }, 100)
      }
    },
    updateDays() {
      const newMonthDaysNum = this.calcDays(
        this.getWheelData(2),
        this.getWheelData(0)
      )
      if (
        newMonthDaysNum > 0 &&
        this.wheels[1].data.length !== newMonthDaysNum
      ) {
        const tempArr = []
        for (let k = 1; k <= newMonthDaysNum; k++) {
          tempArr.push(k)
        }
        this.wheels[1].data = tempArr
        this.checkIsOverBorder(this.wheels[1])
      }
    },
    handleTouch(e, index) {
      e = e || window.event
      const curWheelObj =
        typeof index === 'number'
          ? this.wheels[index]
          : this.wheels[this.activeWheelIndex]
      switch (e.type) {
        case 'touchstart':
        case 'mousedown':
          if (e.type === 'touchstart') {
            this.startY = e.touches[0].clientY
          } else {
            this.startY = e.clientY
            this.activeWheelIndex = index
            this.clickFlag = true
            e.preventDefault()
          }
          curWheelObj.anim = false
          this.oldMoveY = this.startY
          this.startTime = new Date().getTime()
          break
        case 'touchend':
        case 'mouseup':
          if (e.type === 'touchend') {
            this.moveEndY = e.changedTouches[0].clientY
          } else {
            this.moveEndY = e.clientY
            this.clickFlag = false
          }
          this.offsetDistance = this.moveEndY - this.startY
          curWheelObj.anim = true
          curWheelObj.translateY = this.fixPosition(
            curWheelObj.translateY + this.offset
          )

          /* eslint-disable no-case-declarations */
          const offsetTime = new Date().getTime() - this.startTime
          const scrollSpeed = this.offsetDistance / offsetTime
          const tempTime = Math.abs(parseInt(scrollSpeed * 1000))
          curWheelObj.transitionTime = '700ms'
          if (Math.abs(scrollSpeed) > 0.3) {
            curWheelObj.transitionTime =
              tempTime > 700 ? tempTime + 'ms' : '700ms'
            curWheelObj.translateY = this.fixPosition(
              curWheelObj.translateY + scrollSpeed * 250
            )
          }
          this.checkIsOverBorder(curWheelObj)
          this.clearHover()
          break
        case 'mousemove':
        case 'touchmove':
          e.preventDefault()
          if (e.type === 'mousemove' && !this.clickFlag) {
            return false
          }
          this.moveY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
          this.offset = this.moveY - this.oldMoveY
          curWheelObj.translateY += this.offset
          this.oldMoveY = this.moveY
          break
        case 'mousewheel':
          curWheelObj.anim = true
          curWheelObj.translateY = this.fixPosition(
            curWheelObj.translateY + parseInt((e.wheelDelta || e.detail) * 0.3)
          )
          this.oversizeBorder = -(curWheelObj.data.length - 3) * this.liHeight
          this.checkIsOverBorder(curWheelObj)
          break
      }
      if (index <= 1) {
        this.updateDays()
      }
    },
    handleSingleClick(e, wheelIndex, itemIndex) {
      if (Math.abs(this.offsetDistance) < 30) {
        this.wheels[wheelIndex].translateY = this.getDistanceByIndex(itemIndex)
      }
    },
    hoverClass(e, wheelIndex, itemIndex) {
      this.activeClick.wheelIndex = wheelIndex
      this.activeClick.itemIndex = itemIndex
    },
    clearHover() {
      this.activeClick.wheelIndex = -100
      this.activeClick.itemIndex = -100
    },
    getSelectData() {
      const _this = this
      const tempArr = []
      this.wheels.forEach(function (item, wheelIndex) {
        tempArr.push(_this.addPrefix(_this.getWheelData(wheelIndex)))
      })
      this.selectValue = tempArr.join('/')
      this.$emit('input', this.selectValue)

      this.hidePanel()
    },
    hidePanel() {
      this.clearHover()
      this.popShow = false
      if (this.selectValue) {
        this.locateWheelByVal(this.selectValue)
      }
    },
    showPanel() {
      this.clearHover()
      this.popShow = true
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container
  text-align: center
  input[type='text']
    padding: 13px 0px
    border: 0
    border: 1px solid $color-gray-60
    width: 350px
    text-align: center
    margin: 20px auto
    font-size: 15px
    color: $color-gray-74

  ::placeholder
    font-size: 15px
    color: $color-gray-17b

 
.vue-date-select-container .vm-dialog-content
  z-index: 10
  width: auto
  min-width: 280px
  max-width: 550px
  background: $color-white-1
  opacity: 0

  &.s
    pointer-events: none

  & .vm-wheels
    display: flex
    position: relative

  & .vm-wheels::after
    content: ''
    position: absolute
    left: 0
    right: 0
    top: 0
    height: 100px
    z-index: 2
    background: -moz-linear-gradient(top,$color-white-1 0%,$color-white-18 100%)
    background: -webkit-linear-gradient(top,$color-white-1 0%,$color-white-18 100%)
    background: linear-gradient(to bottom,$color-white-1 0%,$color-white-18 100%)

  & .vm-wheels::before
    content: ''
    position: absolute
    left: 0
    bottom: 0
    right: 0
    height: 100px
    z-index: 3
    background: -moz-linear-gradient(top,$color-white-18 0%,$color-white-1 100%)
    background: -webkit-linear-gradient(top,$color-white-18 0%,$color-white-1 100%)
    background: linear-gradient(to bottom,$color-white-18 0%,$color-white-1 100%)

  & .vm-wheels .vm-wheel
    position: relative
    z-index: 2
    width: 33.33%
    height: 200px
    text-align: center
    margin: 0px
    overflow: hidden
    pointer-events: auto
    touch-action: none

  & .vm-wheels .vm-wheel .vm-line
    position: absolute
    top: 50%
    left: 0px
    height: 40px
    width: 100%
    margin-top: -21px
    border-top: 1px solid $color-gray-75
    border-bottom: 1px solid $color-gray-75
    pointer-events: none

.vue-date-select-container
  .vm-dialog-content
    .vm-wheels
      .vm-wheel
        .vm-items-wrapper
          overflow: hidden
          pointer-events: auto
          cursor: pointer

.vue-date-select-container .vm-dialog-content .vm-option.bulan
  text-align: left

.vue-date-select-container .vm-dialog-content .vm-option
  position: relative
  height: 40px
  @include body-2
  color: $color-gray-76

.vue-date-select-container .vm-dialog-content .vm-btns
  text-align: center

  & .vm-btn
    position: relative
    display: inline-block
    color: $color-black-1
    @include body-5
    cursor: pointer
    border-radius: 5px
    pointer-events: auto

.vue-date-select-container .hover-color-bg
  position: absolute
  left: 0px
  top: 0px
  right: 0px
  bottom: 0px
  opacity: 0

.vue-date-select-container.vm-date-show .vm-dialog-content
  transform: scale(1)
  opacity: 1
  top: 20%
  border-radius: 5px
  position: relative

.control-next,
.control-done
  font-family: $font-sp-pro
  font-style: normal
  @include body-17-normal
  display: flex
  align-items: center
  letter-spacing: -0.02em
  color: $color-blue-20
.controls
  display: inline-flex
  width: 100%
  justify-content: space-between
  border-top: 1px solid $color-gray-15
  border-bottom: 1px solid $color-gray-15
  padding: 10px
  .control-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-normal
    display: flex
    align-items: center
    letter-spacing: -0.02em
    color: $color-blue-20
  .control-label
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-normal
    display: flex
    align-items: center
    color: $color-black-1

</style>
