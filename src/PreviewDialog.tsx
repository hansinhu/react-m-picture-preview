/*
 * @Author: xinghanhu@clubfactory.com
 * PreviewDialog： 预览弹窗
 * @Date: 2019-05-30 13:34:08
 * @Last Modified by: xinghanhu@clubfactory.com
 * @Last Modified time: 2019-05-31 15:53:54
 */

import React from 'react';
import Gesture, { IGestureStatus } from 'rc-gesture';
import classnames from 'classnames';
import { DialogPropsType } from './PropsTypes';

class PreviewDialog extends React.Component<DialogPropsType, any> {
  static defaultProps = {
    items: [],
    options: {},
    close: () => {},
    swipeCallBack: () => {},
    showCloseIcon: true,
  };

  layout: any
  itemList: any
  ySlideLen: number = 260
  yOpacityLen: number = 160
  xSlideLen: number = 100

  onPan = (() => {
    let lastOffset: number | string = 0;
    let slideDirection: string = '';
    let finalOffset = 0;

    const getLastOffset = () => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= this.layout.clientWidth;
      }
      return offset;
    };

    return {
      onPanStart: (status: IGestureStatus) => {
        this.setState({
          startPoint: status.startTouches[0],
          isMoving: true,
        })
      },

      onPanMove: (status: IGestureStatus) => {
        if (!status.moveStatus || !this.layout) return;
        if (Math.abs(status.moveStatus.y) > Math.abs(status.moveStatus.x) || slideDirection === 'vertical') {
          // 垂直方向关闭
          const offset = status.moveStatus.y;
          if (!slideDirection) slideDirection = 'vertical'
          const item = this.itemList[this.state.itemIndex]
          const scale = (this.ySlideLen - Math.abs(offset)) > 0 ? (this.ySlideLen - Math.abs(offset)) : 0
          item.style.transform = `translate3d(0px, ${offset}px, 1px) scale(${scale / this.ySlideLen})`
          finalOffset = Math.abs(offset)

          const opcityScale = (this.yOpacityLen - Math.abs(offset)) > 0 ? (this.yOpacityLen - Math.abs(offset)) : 0
          this.setState({
            showPrev: false,
            showNext: false,
            slidOpacity: opcityScale / this.yOpacityLen,
          });
        } else {
          // 水平方向切换
          if (!slideDirection) slideDirection = 'horizontal'
          const offset = getLastOffset() + (status.moveStatus.x);
          const moveOffset = status.moveStatus.x
          this.layout.style.transform = `translate3d(${offset}px, 0px, 1px)`
          finalOffset = Math.abs(moveOffset)

          this.setState({
            showPrev: moveOffset > 0,
            showNext: -moveOffset > 0,
          });
        }
      },

      onPanEnd: () => {
        this.layout.style.transform = `translate3d(0px, 0px, 1px)`
        this.setState({
          isMoving: false,
        })
        if (slideDirection === 'vertical') {
          this.verticalSlideEnd(finalOffset);
        }
        this.horizontalSlideEnd();
        slideDirection = ''
      },

      setCurrentOffset: (offset: number | string) => lastOffset = offset,
    };
  })();

  constructor(props: DialogPropsType) {
    super(props);
    this.state = {
      itemIndex: props.itemIndex || 0,
      startPoint: null,
      showPrev: false,
      showNext: false,
      direction: null,
      slidOpacity: 1,
      isMoving: false,
    }
  }

  // componentWillReceiveProps = (nextProps: DialogPropsType) => {
  //   console.log(nextProps);
  // };

  componentDidMount() {
    this.initPreviewNode()
  }

  componentWillUnmount() {
    this.handleClose();
  }
  handleClose = () => {
    this.setState({
      slidOpacity: 0,
    })
    const item = this.itemList[this.state.itemIndex]
    item.style.opacity = 0
    item.style.transform = `translate3d(0px, 0px, 1px) scale(1)`
    this.props.close && this.props.close(this.state.itemIndex);
  };

  initPreviewNode = () => {
    this.layout.style.transform = `translate3d(-${this.state.itemIndex * 100}%, 0px, 1px)`
    this.itemList.forEach((item: HTMLDivElement) => {
      item.style.transform = 'translate3d(0px, 0px, 1px) scale(1)'
      item.style.opacity = '1'
    })
  }

  horizontalSlideEnd = () => {
    const { showNext, showPrev } = this.state;
    const { items } = this.props;
    const { setCurrentOffset } = this.onPan;
    let index = this.state.itemIndex
    if (showNext) {
      index = index + 2 > items.length ? index : index + 1
    } else if (showPrev) {
      index = index < 1 ? index : index - 1
    }
    this.setState({
      itemIndex: index,
    })
    setCurrentOffset(`-${index * 100}%`);
    this.layout.style.transform = `translate3d(-${index * 100}%, 0px, 1px)`
    setTimeout(() => {
      this.props.swipeCallBack && this.props.swipeCallBack(index)
    }, 300)
  }

  verticalSlideEnd = (finalOffset: number) => {
    if (finalOffset > this.ySlideLen / 2) {
      this.handleClose()
    } else {
      const item = this.itemList[this.state.itemIndex]
      item.style.transform = `translate3d(0px, 0px, 1px) scale(1)`
      this.setState({
        slidOpacity: 1,
      })
    }
  }

  setContentLayout = (div: HTMLDivElement) => {
    this.layout = div;
  }

  // 展开时防止body滚动
  // bodyDisaleScroll = (e: any) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  render() {
    const { items, className, bottomOperateContent, showCloseIcon } = this.props
    const { itemIndex, slidOpacity, isMoving } = this.state
    const { setCurrentOffset, ...onPan } = this.onPan;
    const dialogCls = classnames('rm_preview-dialog', className)
    const containerCls = classnames(
      'rm_preview__container',
      {
        'rm_preview__container__transtion': !isMoving,
      },
    )
    setCurrentOffset(`-${itemIndex * 100}%`);
    return (
      <div
        className={dialogCls}
        tabIndex={-1}
        role="dialog"
      >
        <div className="rm_preview__bg" style={{ opacity: slidOpacity }}/>
        <div className="rm_preview__scroll-wrap">
          <Gesture
            {...onPan}
            direction={'all'}
          >
            <div ref={this.setContentLayout} className={containerCls}>
              {
                items.map((item: any, i) => {
                  return <div key={i + ''} ref={(node) => {
                    this.itemList = this.itemList || [];
                    this.itemList[i] = node;
                  }} className="rm_preview__item">
                    <div className="rm_preview__zoom-wrap">
                      <img onClick={this.handleClose} className="rm_preview__img" src={item.src} />
                    </div>
                  </div>
                })
              }
            </div>
          </Gesture>
          <div className="rm_preview__ui" style={{ opacity: slidOpacity }}>
            <div className="rm_preview__top-bar">
              <div className="rm_preview__top-bar__center">
                <span>{`${itemIndex + 1} / ${items.length}`}</span>
                {
                  showCloseIcon && <span>x</span>
                }
              </div>
            </div>
            <div className="rm_preview__bottom">
              {
                items[itemIndex].title ? <div className="rm_preview__caption">{items[itemIndex].title}</div> : null
              }
              {
                bottomOperateContent ? <div className="rm_preview__bottom-bar">{bottomOperateContent(items[itemIndex])}</div> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewDialog
