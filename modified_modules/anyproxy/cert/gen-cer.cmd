@echo off

set domain=%1
set outputPath=%2
set rootCADir=%3
set sslFilesPath=%4\
set commonname=%domain%
set country=CN
set state=guangdong
set locality=guangzhou
set organization=t
set organizationalunit=IT
set email=wechat@v2team
set password=a

set OPENSSL_CONF=%sslFilesPath%openssl.conf



echo Generating key request for %domain%

%sslFilesPath%openssl genrsa -passout pass:%password% -out %domain%.key 2048


echo Removing passphrase from key
%sslFilesPath%openssl rsa -in %domain%.key -passin pass:%password% -out %domain%.key

echo Creating CSR
%sslFilesPath%openssl req -new -key %domain%.key -out  %domain%.csr -passin pass:%password% -subj /C=%country%/ST=%state%/L=%locality%/O=%organization%/OU=%organizationalunit%/CN=%commonname%/emailAddress=%email%

%sslFilesPath%openssl x509 -req -days 3650 -in  %domain%.csr -CA  %rootCADir%rootCA.crt -CAkey %rootCADir%rootCA.key -CAcreateserial -out  %domain%.crt
echo Finished
