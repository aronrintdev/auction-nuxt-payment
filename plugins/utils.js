export default (context, inject) => {
  const sum = (arr) => {
    let total = 0;
    arr.forEach(item => {
      total += Number(item.price)
    })
    return total;
  }
  inject('sum', sum)
  context.$sum = sum
}
