#!/bin/bash

install_path='/opt/tencent';
current_dir=`pwd`
desktop_dir='/usr/share/applications'
soft_link_path='/usr/local/bin/wechat_web_devtools_old'

# install app
argv1=$1
if [ "$argv1" != "" ]; then
    install_path=${argv1%%/}
fi

if [ ! -d "$install_path" ]; then
    sudo mkdir -p $install_path
fi

app_path="${install_path}/wechat_web_devtools_old"
if [ -d $app_path ]; then
 sudo rm -rf $app_path
fi

sudo cp -r $current_dir $app_path

sed_argv="s/=\/opt\/tencent/=${install_path//'/'/'\/'}/ig"
sudo sed -i $sed_argv "${app_path}/wechat_web_devtools.desktop"

sudo chown -R $USER:$USER $app_path

cat >"${app_path}/wechat_web_devtools"<<EOF
#!/bin/sh

cd $app_path
./nw &

EOF

# create shortcut
if [ -d "$desktop_dir" ]; then
    sudo cp "${app_path}/wechat_web_devtools.desktop" "${desktop_dir}/wechat_web_devtools_old.desktop"
fi

# create soft link and boot application from terminal
if [ -L $soft_link_path ]; then
    sudo rm -f $soft_link_path
fi;
sudo ln -s "${app_path}/wechat_web_devtools" $soft_link_path
sudo chown $USER:$USER $soft_link_path

echo "Installation Successfully!"
echo ""
echo "Application Path: ${app_path}"
echo "Soft Link Path: ${soft_link_path}"
