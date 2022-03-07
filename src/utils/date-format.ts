// 通过dayjs工具封装时间格式化方法
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATA_TIME_FORMAT
) {
  // utc对标的是0时区，北京时间处于东八区所以要偏移八个小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
