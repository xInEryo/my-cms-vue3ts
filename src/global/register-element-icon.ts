import { App } from 'vue'

import {
  Setting,
  Monitor,
  Goods,
  ChatLineRound,
  UserFilled,
  Iphone,
  Fold,
  Expand,
  ArrowDown,
  CircleClose,
  ArrowRight,
  Search,
  Refresh,
  Edit,
  Delete
} from '@element-plus/icons-vue'

// 创建图标字典
const dictIcon = {
  'el-icon-setting': Setting,
  'el-icon-monitor': Monitor,
  'el-icon-goods': Goods,
  'el-icon-chat-line-round': ChatLineRound,
  'el-icon-user-filled': UserFilled,
  'el-icon-iphone': Iphone,
  'el-icon-fold': Fold,
  'el-icon-expand': Expand,
  'el-icon-arrow-down': ArrowDown,
  'el-icon-circle-close': CircleClose,
  'el-icon-arrow-right': ArrowRight,
  'el-icon-search': Search,
  'el-icon-refresh': Refresh,
  'el-icon-edit': Edit,
  'el-icon-delete': Delete
}

// 导出通过 app.use()进行全局注册
const registerIcon = (app: App) => {
  app.config.globalProperties.$icon = dictIcon
}

// 通过 <componet :is="name"></componet>动态加载组件

export default registerIcon
