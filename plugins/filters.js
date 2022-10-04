import Vue from 'vue'
import { MONTHS, EXPIRED_STATUS, API_PROD_URL, PRODUCT_IMG_WIDTH } from '~/static/constants'

Vue.filter('formatPrice', (value) => {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'string') {
    return (parseFloat(value) / 100).toFixed(2)
  }
  return (value / 100).toFixed(2)
})


Vue.filter('getProductImageUrl', (product) => {
  return API_PROD_URL + '/' + product?.category?.name + '/' + product?.sku + '/image?width=' + PRODUCT_IMG_WIDTH
})


/**
 * This function is used to show selected items by joining them
 * in string format seperated by commas
 * @param selectedOptionsArray
 * @param maxLabelsAllowed
 * @returns {string|*}
 */
Vue.filter('joinAndCapitalizeFirstLetters', (selectedOptionsArray, maxLabelsAllowed) => {
  selectedOptionsArray = selectedOptionsArray.map(o => o[0].toUpperCase() + o.slice(1))
  return (selectedOptionsArray.length > maxLabelsAllowed)
    ? selectedOptionsArray.slice(0, maxLabelsAllowed).join(', ') + '...' // append dots if labels exceed limits of showing characters
    : selectedOptionsArray.join(', ')
})


/**
 * This function do first letter of word capital
 * @param string
 * @returns {string}
 */
Vue.filter('capitalizeFirstLetter', (string) => {
  if (typeof string === 'string')
    return string[0].toUpperCase() + string.slice(1);
  else if (typeof string === 'object' && string.size && typeof string.size === 'string')
    return string.size[0].toUpperCase() + string.size.slice(1);
})

Vue.filter('toCurrency', (value, currency = 'USD', alt = '-') => {
    if (typeof value !== 'number') {
        return alt
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    })
    return formatter.format(value / 100)
})

// Format date as 'MM-DD-YYYY' or 'MM/DD/YYYY' string.
Vue.filter('formatDate', (value, type) => {
  const date = new Date(value)
  const dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  const mm = date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  const yyyy = date.getFullYear()
  if (type === 'MM-DD-YYYY') {
    return `${mm}-${dd}-${yyyy}`
  }
  if(type === 'YYYY-MM-DD'){
    return `${yyyy}-${mm}-${dd}`
  }
  // Date in DD/MM/YYYY format
  if(type === 'DD/MM/YYYY'){
    return `${dd}/${mm}/${yyyy}`
  }
  return `${mm}/${dd}/${yyyy}`
})

Vue.filter('remainingTime', (value, type) => {
  // Calculate remaining time in this format: "xDAYS yHRS zMINS"
  const { created_at: createdAt, time_limit: timeLimit } = value
  const endingTimestamp = new Date(createdAt).valueOf() + 86400000 * timeLimit
  const currentTimestamp = new Date().valueOf()
  let diffInSeconds = (endingTimestamp - currentTimestamp) / 1000
  if (diffInSeconds < 0) {
    return EXPIRED_STATUS
  }
  const days = parseInt(diffInSeconds / 86400)
  diffInSeconds = diffInSeconds - days * 86400
  const hrs = parseInt(diffInSeconds / 3600)
  diffInSeconds = diffInSeconds - hrs * 3600
  const mins = Math.ceil(diffInSeconds / 60)
  if (type === 'short') {
    if (!hrs && !days)
      return hrs + 'h'
    return `${days > 0 ? days + 'd ' : ''}${hrs > 0 ? hrs + 'h' : ''}`
  }
  if (type === 'medium') {
    return `${days < 10 ? '0' + days + 'd ' : days + 'd '}${
      hrs < 10 ? '0' + hrs + 'h ' : hrs + 'h '
    } ${mins < 10 ? '0' + mins + 'm' : mins + 'm'}`
  }
  return `${days > 0 ? days + ' DAYS ' : ''}${hrs > 0 ? hrs + ' HRS ' : ''} ${
    mins > 0 ? mins + ' MINS' : ''
  }`
})

Vue.filter('toPercentage', (value) => {
    if (typeof value !== 'number') {
        return ''
    }
    return value + '%'
})

Vue.filter('formatTime', (value, divider = '-') => {
  const date = new Date(value)
  const hrs = date.getHours()
  const mins = date.getMinutes()
  const secs = date.getSeconds()
  return (
    (hrs > 9 ? hrs + 1 : '0' + hrs) +
    divider +
    (mins > 9 ? mins : '0' + mins) +
    divider +
    (secs > 9 ? secs : '0' + secs)
  )
})

Vue.filter('formatDateTimeString', (value) => {
  const date = new Date(value)
  // Time
  let hours = date.getHours()
  let minutes = date.getMinutes()

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  const strTime = hours + ':' + minutes + ' ' + ampm

  // Timzone Abbrevation.
  const timezone = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      timeZoneName: 'short',
    })
    .slice(4)

  const monthName = MONTHS[date.getMonth()].text

  return `${
    monthName.charAt(0).toUpperCase() + monthName.slice(1)
  } ${date.getDate()}, ${date.getFullYear()} ${strTime} ${timezone}`
})
