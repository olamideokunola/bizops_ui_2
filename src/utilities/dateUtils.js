import { ref, computed } from '@vue/composition-api'
import store from '../store'

// Convert to 2-digit string
function convertToTwoDigitString (value) {
  if (value < 10) {
    value = '0' + value.toString()
  } else {
    value = value.toString()
  }
  return value
}

function getMonthInYYYYMMYY (date) {
  const dateElements = date.split('-')
  return Number(dateElements[1])
}

function getYearInYYYYMMYY (date) {
  const dateElements = date.split('-')
  return Number(dateElements[0])
}

function getDayInYYYYMMYY (date) {
  const dateElements = date.split('-')
  return Number(dateElements[2])
}

function getDaysInMonth (year, month) {
  // alert('Month is: ' + month)
  // off set month number to change january to 1 from 0
  month++
  const rem = year % 4
  const thirtyDays = [4, 9, 6, 11]
  const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12]
  // February
  if (Number(month) === 2) {
    if (rem === 0) {
      return 29
    } else {
      return 28
    }
  // 30 days
  } else if (thirtyDays.includes(Number(month))) {
    return 30
  // 31 days
  } else if (thirtyOneDays.includes(Number(month))) {
    return 31
  // invalid months
  } else {
    return null
  }
}

function useDateUtilities ({ state }) {
  var today = new Date()
  var day = today.getDate()
  var month = today.getMonth()
  var year = today.getFullYear()

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var monthName = months[month]

  var monthCorrected = Number(month) + 1

  // Convert month to String
  monthCorrected = convertToTwoDigitString(monthCorrected)

  // Convert date to String
  day = convertToTwoDigitString(day)

  var todaysDate = ref(monthName + ' ' + day + ', ' + year)
  var todaysDateYYYYMMDD = ref(year + '-' + monthCorrected + '-' + day)
  // var currentDateYYYYMMDD = ref(year + '-' + monthCorrected + '-' + day)
  var currentDateYYYYMMDD = computed({
    get: () => {
      if (store.state.currentDateYYYYMMDD === '') {
        store.state.currentDateYYYYMMDD = todaysDateYYYYMMDD.value
        return store.state.currentDateYYYYMMDD
      } else {
        return store.state.currentDateYYYYMMDD
      }
    },
    set: (val) => {
      // alert(val)
      store.state.currentDateYYYYMMDD = val
    }
  })

  var currentDate = computed(() => {
    const currDateElements = currentDateYYYYMMDD.value.split('-')
    const day = Number(currDateElements[2])
    const month = Number(currDateElements[1]) - 1
    const monthName = months[month]
    const year = Number(currDateElements[0])
    return monthName + ' ' + day + ', ' + year
  })

  // goto next month
  const nextMonth = () => {
    // alert('In next month!')
    const dateElements = currentDateYYYYMMDD.value.split('-')
    var month = Number(dateElements[1])
    var year = Number(dateElements[0])
    var monthStr = ''

    // Get Next Month
    if (month === 12) {
      month = 1
      year++
    } else {
      month++
    }

    // Convert to String
    if (month < 10) {
      monthStr = '0' + month.toString()
    } else {
      monthStr = month.toString()
    }

    var yearStr = year.toString()

    currentDateYYYYMMDD.value = yearStr + '-' + monthStr + '-01'
  }

  // Goto previous month
  const previousMonth = () => {
    // alert('In previous Month!')
    const dateElements = currentDateYYYYMMDD.value.split('-')
    var month = Number(dateElements[1])
    var year = Number(dateElements[0])
    var monthStr = ''

    // Get Previous Month
    if (month === 1) {
      month = 12
      year--
    } else {
      month--
    }

    // Convert to String
    if (month < 10) {
      monthStr = '0' + month.toString()
    } else {
      monthStr = month.toString()
    }

    var yearStr = year.toString()

    currentDateYYYYMMDD.value = yearStr + '-' + monthStr + '-01'
  }

  const setcurrentDateYYYYMMDD = ({ date }) => {
    currentDateYYYYMMDD.value = date
  }

  function formatDateAsYYYYMMDD ({ date }) {
    const dateElements = date.split('-')
    var month = convertToTwoDigitString(Number(dateElements[1]))
    var year = Number(dateElements[0])
    var day = convertToTwoDigitString(Number(dateElements[2]))

    alert('In formatDateAsYYYYMMDD ' + year + '-' + month + '-' + day)

    return year + '-' + month + '-' + day
  }

  // goto next month
  const nextDay = () => {
    // alert('In next day!')
    var currMonth = Number(getMonthInYYYYMMYY(currentDateYYYYMMDD.value))
    var currYear = Number(getYearInYYYYMMYY(currentDateYYYYMMDD.value))
    var currDay = Number(getDayInYYYYMMYY(currentDateYYYYMMDD.value))
    var daysInMonth = getDaysInMonth(year, month)

    var nextDay = 0
    var nextMonth = 0
    var nextYear = 0
    // alert('in dateUtils, today is: ' + day + ', current day is ' + currDay)
    // alert("in dateUtils, today's month is: " + month + ', current month is ' + currMonth)
    // alert("in dateUtils, today's year is: " + year + ', current year is ' + currYear)

    // Go to next day only if not today
    if (currDay === Number(day) && currMonth === (Number(month) + 1) && currYear === Number(year)) {
      // Do nothing
      // alert('in dateUtils, today is current')
      store.dispatch('showSnackBarMessage', { message: 'Cannot go to next day!' })
    } else {
      // at end of month
      // alert('Days in month is: ' + daysInMonth)
      if (currDay === daysInMonth) {
        // set next day
        nextDay = 1
        // set next month to january if december and increase year
        if (currMonth === 12) {
          nextMonth = 1
          nextYear = currYear + 1
        // set next month for other momnths and keep year
        } else {
          nextMonth = currMonth + 1
          nextYear = currYear
        }
      // for other days apart from end of month
      } else {
        // set next day
        nextDay = currDay + 1
        // keep month
        nextMonth = currMonth
        // keep year
        nextYear = currYear
      }

      currentDateYYYYMMDD.value = nextYear.toString() + '-' + nextMonth.toString() + '-' + nextDay.toString()
    }
  }

  // goto previous day
  const previousDay = () => {
    // alert('In previous month!')
    var month = getMonthInYYYYMMYY(currentDateYYYYMMDD.value)
    var year = getYearInYYYYMMYY(currentDateYYYYMMDD.value)
    var day = getDayInYYYYMMYY(currentDateYYYYMMDD.value)
    const daysInPreviousMonth = getDaysInMonth(year, Number(month) - 1)

    var previousDay = 0
    var previousMonth = 0
    var previousYear = 0

    // at end of month
    if (day === 1) {
      // set previous day to last day pf previous month
      previousDay = daysInPreviousMonth
      // set previous month to december if in january and reduce year
      if (month === 1) {
        previousMonth = 12
        previousYear = year - 1
      // set previous month for other months and keep year
      } else {
        previousMonth = month - 1
        previousYear = year
      }
    // for other days apart from start of month
    } else {
      // set previous day
      previousDay = day - 1
      // keep month
      previousMonth = month
      // keep year
      previousYear = year
    }

    currentDateYYYYMMDD.value = previousYear.toString() + '-' + previousMonth.toString() + '-' + previousDay.toString()
    // alert('In dateUtils, currentDateYYYYMMDD is ' + currentDateYYYYMMDD.value)
  }

  var currentMonth = computed(() => getMonthInYYYYMMYY(currentDateYYYYMMDD.value))
  var currentYear = computed(() => getYearInYYYYMMYY(currentDateYYYYMMDD.value))
  var currentDay = computed(() => getDayInYYYYMMYY(currentDateYYYYMMDD.value))

  return {
    todaysDate,
    day,
    month,
    monthCorrected,
    year,
    todaysDateYYYYMMDD,
    currentDate,
    nextMonth,
    previousMonth,
    currentDateYYYYMMDD,
    setcurrentDateYYYYMMDD,
    formatDateAsYYYYMMDD,
    nextDay,
    previousDay,
    currentMonth,
    currentYear,
    currentDay
  }
}

export { useDateUtilities, getYearInYYYYMMYY, getMonthInYYYYMMYY, getDayInYYYYMMYY }
