@echo off

set OPENSSL_CONF=%cd%\openssl.conf
bin\openssl genrsa -out ..\lib\.anyproxy_certs\rootCA.key 2048
bin\openssl req -x509 -new -nodes -key ..\lib\.anyproxy_certs\rootCA.key -days 3650 -out ..\lib\.anyproxy_certs\rootCA.crt -subj "/C=CN/ST=SH/L=SH/O=AnyProxy/OU=Section/CN=Anyproxy SSL Proxying/emailAddress=AnyProxy@AnyProxy"
echo =============
echo rootCA generated at :
echo %cd%
echo =============


