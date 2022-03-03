import { App } from 'vue'

import registerProperties from './register-properties'
import registerIcon from './register-element-icon'

export default function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerIcon)
}
