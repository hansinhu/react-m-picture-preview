import React from 'react';
import * as ReactDOM from 'react-dom';

import PreviewDialog from './PreviewDialog';
import { DialogPropsType, OpenPreviewProps } from './PropsTypes';

function openPreview (config: OpenPreviewProps) {
  if (!document) {
    return;
  }
  const div = document.createElement('div')
  document.body.appendChild(div)

  let currentConfig = { ...config, close }

  function close (...args: Array<any>) {
    currentConfig = {
      ...currentConfig,
    }
    render(currentConfig)
    config.onClose && config.onClose(...args)
    setTimeout(() => {
      destroy(...args)
    }, 300)
  }

  function update (newConfig: OpenPreviewProps) {
    currentConfig = {
      ...currentConfig,
      ...newConfig,
    };
    render(currentConfig);
  }

  function destroy (...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div)
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div)
    }
    const triggerCancel = args && args.length && args.some(param => param && param.triggerCancel);
    if (config.onClose && triggerCancel) {
      config.onClose(...args)
    }
  }

  function render (props: DialogPropsType) {
    ReactDOM.render(<PreviewDialog {...props}/>, div)
  }

  render(currentConfig)
  return {
    destroy: close,
    update,
  }
}

export default openPreview;
