---
category: Components
type: 数据展示
title: PhotoPreview
subtitle: 图片预览
---

图标

## API

PhotoPreview

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| isOpen |  是否打开预览  |  boolean  |  false  |
| items | 图片列表 | array[{src, title}] | [] |
| itemIndex | 预览图片索引值 | number | [] |
| thumbnailContent |  自定义缩略图节点  |  () => Node  | (item) => <img src={item.src} width="100" height="100" alt=""/> |
| bottomOperateContent |  自定义底部操作按钮  |  () => Node  | 无 |
| options | 配置项 | object | {} |
| onClose | 关闭时回调 | (index) => index  | 无 |
| swipeCallBack | 左右切换时回调 | (index) => index  | 无 |
| showCloseIcon | 是否显示关闭按钮 | boolean  | true |
| thumbnailClassName | className | string  | 无 |
| className | className | string  | 无 |

PhotoPreview.open({...config})
函数式调用（无缩略图）

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| items | 图片列表 | array[{src, title}] | [] |
| itemIndex | 预览图片索引值 | number | [] |
| options | 配置项 | object  | {} |
| onClose | 关闭时回调 | (index) => index  | 无 |
| swipeCallBack | 左右切换时回调 | (index) => index  | 无 |
| bottomOperateContent |  自定义底部操作按钮  |  () => Node  | 无 |
| showCloseIcon | 是否显示关闭按钮 | boolean  | true |
| className | className | string  | 无 |
