// const userFullDate = user.createdAt.replace("Z", "").split("T")
// const userDate = userFullDate[0].split('-').reverse().join('.')
// const userTime = userFullDate[1].split('.')[0]

export const handleDate = (dateString) => {
  const FullDate = dateString.replace("Z", "").split("T")
  const Date = FullDate[0].split('-').reverse().join('.')
  const Time = FullDate[1].split('.')[0]
  return [Date, Time]
}