type IFormType = 'input' | 'password' | 'select' | 'datepicker'
interface IOptions {
  title: string
  value: any
}

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: IOptions[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IFrom {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
