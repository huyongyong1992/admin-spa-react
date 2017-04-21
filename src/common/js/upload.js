import fetch from './fetch';
import { errorHandler } from './utils';

function getSuffix(filename) {
  const pos = filename.lastIndexOf('.');
  let suffix = '';

  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

function getFileName(filename) {
  const suffix = getSuffix(filename);
  const len = 32;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return suffix ? `${pwd}${suffix}` : '';
}

class Upload {
  constructor(props) {
    this.props = props;
    this.update(true);
  }

  setUploadParam(up, filename, ret) {
    const { host, dir, policy, accessid, signature } = this.config;
    const key = filename ? `${dir}${getFileName(filename)}` : '';
    up.setOption({
      url: host,
      multipart_params: {
        key,
        policy,
        OSSAccessKeyId: accessid,
        success_action_status: '200',
        signature,
      },
    });
    up.start();
    if (ret) {
      this.fileUrl = `${host}/${key}`;
    }
  }

  init() {
    const me = this;
    const props = this.props;
    const successCallBack = props.successCallBack;
    const plupload = window.plupload;
    const uploader = this.uploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: 'selectfiles',
      container: document.getElementById('container'),
      flash_swf_url: '../../../lib/plupload-2.1.2/js/Moxie.swf',
      silverlight_xap_url: '../../../lib/plupload-2.1.2/js/Moxie.xap',
      url: 'http://oss.aliyuncs.com',
      filters: {
        mime_types: [{
          title: 'Image files',
          extensions: 'jpg,gif,png,bmp,jpeg',
        }],
        max_file_size: '10mb',
      },
      init: {
        FilesAdded: function FilesAdded() {
          me.setUploadParam(uploader, '', false);
        },
        BeforeUpload: function BeforeUpload(up, file) {
          me.setUploadParam(up, file.name, true);
        },
        FileUploaded: function FileUploaded(up, file, info) {
          if (info.status === 200) {
            successCallBack(me.fileUrl);
          }
        },
      },
    });
    this.uploader.init();
  }

  update(isInit) {
    const me = this;
    const props = this.props;

    fetch.mtop.oss.getH5PolicySign({
      data: {
        bucket: props.bucket,
        dir: props.dir,
      },
    }).then((data) => {
      this.config = data;
      if (isInit) {
        me.init();
      }
      // 过期前5秒自动更新
      window.setTimeout(me.update.bind(me), (Number(data.expireInterval) - 5) * 1000);
    }).catch(errorHandler);
  }
}

export default Upload;
