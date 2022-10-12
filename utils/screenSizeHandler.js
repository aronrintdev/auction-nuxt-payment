let enquireJs = null
if (process.browser) {
  enquireJs = require('enquire.js')
}

export const SCREEN_SIZE = {
  XS: 'XS',
  SM: 'SM',
  MD: 'MD',
  LG: 'LG',
  XL: 'XL'
};

export const enquireScreenSizeHandler = (callback) => {
  const matchXS = {
    match: () => {
      if (callback) callback(SCREEN_SIZE.XS)
    },
  }

  const matchSM = {
    match: () => {
      if (callback) callback(SCREEN_SIZE.SM)
    },
  }

  const matchMD = {
    match: () => {
      if (callback) callback(SCREEN_SIZE.MD)
    },
  }

  const matchLG = {
    match: () => {
      if (callback) callback(SCREEN_SIZE.LG)
    },
  }

  const matchXL = {
    match: () => {
      if (callback) callback(SCREEN_SIZE.XL)
    },
  }

  // screen and (max-width: 1087.99px)
  enquireJs
    .register('screen and (max-width: 576px)', matchXS)
    .register('screen and (min-width: 576px) and (max-width: 768px)', matchSM)
    .register('screen and (min-width: 768px) and (max-width: 992px)', matchMD)
    .register('screen and (min-width: 992px) and (max-width: 1200px)', matchLG)
    .register('screen and (min-width: 1200px)', matchXL)
}
