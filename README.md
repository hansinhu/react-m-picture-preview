# react-m-picture-preview
---

React Mobile Carousel Component (web and react-native)


![react](https://img.shields.io/badge/react-%3E%3D_16.0.0-green.svg)
[![node version][node-image]][node-url]
[![npm download][download-img]][download-url]

[npm-url]: http://npmjs.org/package/carousel
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-img]: https://img.shields.io/npm/dm/react-m-picture-preview.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-m-picture-preview

## Screenshots

<img src="https://github.com/hansinhu/react-m-picture-preview/blob/master/assets/img/demoimg.png?raw=true" width="288"/>

## Usage
```
npm install react-m-picture-preview
```
```
import Carousel from 'react-m-picture-preview';

<Carousel>
  <a target="_blank" rel="nofollow me noopener noreferrer" href="https://www.baidu.com">
    <img src="//d3kpm7yklociqe.cloudfront.net/ext/theme/20181207_banner_jpgwinter/banner.jpg" alt=""/>
  </a>
  <a target="_blank" rel="nofollow me noopener noreferrer" href="https://www.baidu.com">
    <img src="//d3kpm7yklociqe.cloudfront.net/ext/theme/20181210_banner_coat/banner.jpg" alt=""/>
  </a>
</Carousel>

```

[see example](https://github.com/hansinhu/react-m-picture-preview/blob/master/examples/demo.tsx)


## Development

```
npm i
npm start
```

## Example

http://localhost:8000/examples/

## install

[![npm download][download-img]][download-url]

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

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

react-m-picture-preview is released under the MIT license.
