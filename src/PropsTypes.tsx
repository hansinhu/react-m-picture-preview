export interface ImgItemPropsType {
  src: string;
  thumbnailSrc?: string;
}

export interface DialogPropsType {
  [index: string]: any;
  itemIndex?: number;
  items: Array<any>;
  bottomOperateContent?: (item: any) => any;
  options: Object;
  swipeCallBack?: (...args: Array<any>) => void;
  onClose?: (...args: Array<any>) => void;
  close?: (...args: Array<any>) => void;
  className?: string;
  showCloseIcon?: boolean;
}

export interface PhotoPreviewProps extends DialogPropsType {
  isOpen: boolean;
  thumbnailContent: (item: any) => any;
  thumbnailClassName?: string;
}

export interface OpenPreviewProps extends DialogPropsType {}
