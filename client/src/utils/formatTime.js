//outputs 'January 23, 2023' date format instead of 'YYYY/MM/DD'
export default function formatTime(timeDate) {
  let date = new Date(timeDate)
  let options = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}
