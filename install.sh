#!/bin/sh
# -------------------------------------------------------------------------------
# Filename:    install.sh
# Revision:    1.0
# Date:        2017/03/19
# Author:      yongxin SHI
# Email:       shiyongxin@aliyun.com
# Website:     www.a-wing.top
# Description: install wechat_web_devtools
# Notes:       no auto remove
# -------------------------------------------------------------------------------

install_path='/opt/tencent/'

mv ./wechat_web_devtools.desktop /usr/share/applications/ && echo /usr/share/applications/wechat_web_devtools.desktop >> install.log

mkdir $install_path
mv ../wechat_web_devtools $install_path

ln -s $install_path'wechat_web_devtools/wechat_web_devtools' /usr/local/bin/wechat_web_devtools && \
  echo /usr/local/bin/wechat_web_devtools >> /opt/tencent/wechat_web_devtools/install.log
