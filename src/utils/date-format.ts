// 通过dayjs工具封装时间格式化方法
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATA_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
