/*
 * @Author: xinghanhu@clubfactory.com
 * PhotoPreview： 缩略图方式打开
 * @Date: 2019-05-30 13:34:08
 * @Last Modified by: xinghanhu@clubfactory.com
 * @Last Modified time: 2019-05-31 15:51:45
 */

import React, { ReactNode } from 'react';
import classnames from 'classnames';
import openPreview from './OpenDialog';
import { PhotoPreviewProps, OpenPreviewProps } from './PropsTypes';

class PhotoPreview extends React.Component<PhotoPreviewProps, any> {

  static open: (config: OpenPreviewProps) => ReactNode;

  static defaultProps = {
    options: {},
    thumbnailContent: (item: any) => (
      <img src={item.thumbnailSrc || item.src} width="100" height="100" alt=""/>
    ),
    className: '',
  };

  showPhotoSwipe = (itemIndex: number, e: any) => {
    e.preventDefault();
    openPreview({
      ...this.props,
      itemIndex,
    });
  };

  render() {
    const { thumbnailClassName, items, thumbnailContent } = this.props;
    const thumbnailCls = classnames(['rm_preview-thumbnails', thumbnailClassName]).trim();
    return (
      <div className={thumbnailCls}>
        {
          items.map((item, index) => (
            <div
              key={index}
              className="rm_preview-thumbnail-item"
              onClick={(e) => this.showPhotoSwipe(index, e)}
            >
              {thumbnailContent(item)}
            </div>
          ))
        }
      </div>
    );
  }
}

PhotoPreview.open = openPreview

export default PhotoPreview;
