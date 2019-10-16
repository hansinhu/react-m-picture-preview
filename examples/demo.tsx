/* eslint no-console:0 */

import 'rmc-picker/assets/index.css';
import 'react-m-picture-preview/assets/index.less';
import PhotoPreview from '../src/index';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Demo extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      itemIndex: 1,
      items: [
        {
          src: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
          title: 'Image 1 这里是描述信息'
        },
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          title: 'Image 2 这里是描述信息'
        },
        {
          src: 'https://r.cfcdn.club/market_ad/b9/b95d6f159974b064d2e1b3732cfa8693.jpg',
          title: 'Image 3 这里是描述信息'
        },
        {
          src: 'https://f.cfcdn.club/assets/fe59777c0b997d0446fbb61a2b9a6e48.png',
          title: 'Image 4 这里是描述信息'
        }
      ],
      options: {},
    }
  }

  changedIndex = (index) => {
    this.setState({
      itemIndex: index,
    })
  }

  iconClick = (type) => {
    console.log('点击了：', type)
    console.log('当前图片索引：', this.state.itemIndex)
  }

  customBottomBtn = () => {
    return <div className='my_preview_btn'>
      <button onClick={() => this.iconClick('home')} >Home</button>
      <button onClick={() => this.iconClick('photos')} >Photos</button>
    </div>
  }

  showPreview = () => {
    PhotoPreview.open({
      items: this.state.items,
      options: {},
      onClose: this.handleClose,
    })
  }
  handleClose = (index) => {
    console.log('handleClose', index)
  }
  render() {
    const { items, options, itemIndex } = this.state
    return (
      <div className='my_btn_content'>
        <NoticeBar>注意：改组件只支持手机模式下使用</NoticeBar>
        <br />
        <div>函数式调用，无缩略图</div>
        <Button onClick={this.showPreview}>Preview</Button>
        <br/>
        <div>组件式调用，有缩略图</div>
        <PhotoPreview
          items={items}
          options={options}
          onClose={this.handleClose}
        />
        <br/>
        <div>添加底部操作按钮</div>
        <PhotoPreview
          items={items}
          options={options}
          onClose={this.handleClose}
          swipeCallBack={this.changedIndex}
          bottomOperateContent={this.customBottomBtn}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
