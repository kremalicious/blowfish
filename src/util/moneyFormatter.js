export const locale = navigator.language.split('-')[0]
// export const locale = 'de'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export const numberFormatter = number =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  }).format(number)
