// 创建一个输入框
export const createInput = (label: string, defaultValue: string) => ({ type: 'input', label, defaultValue })
// 更新颜色
export const createColor = (label: string, defaultValue: string) => ({ type: 'color', label, defaultValue })
// 下拉菜单
export const createSelector = (label: string, options: any[], defaultValue: string) => ({ type: 'selector', label, options, defaultValue })
// 表格渲染
export const createTable = (label: string, table: any[], defaultValue: string) => ({ type: 'table', label, table, defaultValue })
// 滑块
export const createSlider = (label: string, min: number, max: number, step: number, marks: any[], defaultValue: string) => ({ type: 'slider', label, min, max, step, marks, defaultValue })
// 多选框组
export const createCheckboxGroup = (label: string, checkList: any[], defaultValue: string) => ({ type: 'checkboxGroup', label, checkList, defaultValue })
// 单选框组
export const createRadioGroup = (label: string, radioList: any[], defaultValue: string) => ({ type: 'radioGroup', label, radioList, defaultValue })