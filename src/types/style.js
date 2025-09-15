// 创建一个输入框
export const createInput = (label, defaultValue) => ({ type: 'input', label, defaultValue })
// 更新颜色
export const createColor = (label, defaultValue) => ({ type: 'color', label, defaultValue })
// 下拉菜单
export const createSelector = (label, options, defaultValue) => ({ type: 'selector', label, options, defaultValue })
// 表格渲染
export const createTable = (label, table, defaultValue) => ({ type: 'table', label, table, defaultValue })
// 滑块
export const createSlider = (label, min, max, step, marks, defaultValue) => ({ type: 'slider', label, min, max, step, marks, defaultValue })