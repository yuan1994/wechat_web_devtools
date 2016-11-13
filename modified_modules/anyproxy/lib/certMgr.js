var exec = require('child_process').exec,
    execFile = require('child_process').execFile,
    spawn        = require('child_process').spawn,
    path         = require("path"),
    fs           = require("fs"),
    os           = require("os"),
    color        = require('colorful'),
    readline     = require('readline'),
    util         = require('./util'),
    logUtil      = require("./log"),
    asyncTask    = require("async-task-mgr");

// var app = require('app')
// var userCachePath = app.getPath('userData')
// var appPath = app.getAppPath()
var userCachePath = nw.App.getDataPath()
userCachePath = path.join(userCachePath, '..', '..')


var isWin             = /^win/.test(process.platform),
    // certDir           = path.join(userCachePath, "a_c/"),
    // cmdDir            = path.join(userCachePath,"cert/"),
    // // cmd_genRoot       = isWin ? path.join(cmdDir,"./gen-rootCA.cmd") : path.join(cmdDir,"./gen-rootCA"),
    // // cmd_genCert       = isWin ? path.join(cmdDir,"./gen-cer.cmd") : path.join(cmdDir,"./gen-cer"),
    // cmd_genRoot       = isWin ? path.join(__dirname, '..','cert',"./gen-rootCA.cmd") : path.join(__dirname, '..','cert',"./gen-rootCA"),
    // cmd_genCert       = isWin ? path.join(__dirname, '..','cert',"./gen-cer.cmd") : path.join(__dirname, '..','cert',"./gen-cer"),
    createCertTaskMgr = new asyncTask();

var rootCADir = path.join(userCachePath, 'a_c_r/')
var isX64 = process.arch === 'x64'

// if(isWin) {
//     if(!fs.existsSync(cmdDir)) {
//         try{
//             fs.mkdirSync(cmdDir,0o777)
//         } catch(e){
//             logUtil.printLog("===========", logUtil.T_ERR);
//             logUtil.printLog("failed to create cert dir ,please create one by yourself - " + cmdDir, logUtil.T_ERR);
//             logUtil.printLog("this error will not block main thread unless you use https-related features in anyproxy", logUtil.T_ERR);
//             logUtil.printLog("===========", logUtil.T_ERR);
//         }
//     }
//     var files = ['OpenSSL License.txt', 'openssl.conf', 'openssl.exe', 'ssleay32.dll', 'libeay32.dll']
//     var filesPath = path.join(__dirname, '..', 'cert', 'bin32/')
//     var desFilesPath = isX64? path.join( cmdDir, 'bin64/'): path.join( cmdDir, 'bin32/')
//     if(!fs.existsSync(desFilesPath)) {
//         try{
//             fs.mkdirSync(desFilesPath,0o777)
//         } catch(e){
//             logUtil.printLog("===========", logUtil.T_ERR);
//             logUtil.printLog("failed to create cert dir ,please create one by yourself - " + desFilesPath, logUtil.T_ERR);
//             logUtil.printLog("this error will not block main thread unless you use https-related features in anyproxy", logUtil.T_ERR);
//             logUtil.printLog("===========", logUtil.T_ERR);
//         }
//         files.forEach(function(file) {
//             console.log(file)
//             console.log(desFilesPath + file)
//             console.log(path.join(filesPath, file))
//             fs.writeFileSync(desFilesPath + file, fs.readFileSync(path.join(filesPath, file)), {
//                 mode: 0o777
//             })
//         })
//     }

// }

// if(!fs.existsSync(cmdDir)) {
//     try{
//         fs.mkdirSync(cmdDir,0o777)
//         // var cmdFile = isWin? path.join(__dirname,'..', 'cert', 'gen-cer.cmd'): path.join(__dirname,'..', 'cert',  'gen-cer')
//         // var desFile = isWin? path.join(cmdDir, 'gen-cer.cmd'): path.join(cmdDir, 'gen-cer')
//         // fs.writeFileSync(desFile, fs.readFileSync(cmdFile), {
//         //     mode: 0o777
//         // })
//         if(isWin) {
//             // var files = ['libeay32.dll', 'openssl.conf', 'openssl.exe', 'ssleay32.dll']
//             var files = ['OpenSSL License.txt', 'openssl.conf', 'openssl.exe', 'ssleay32.dll', 'libeay32.dll']
//             var filesPath = path.join(__dirname, '..', 'cert', 'bin32/')
//             var desFilesPath = isX64? path.join( cmdDir, 'bin64/'): path.join( cmdDir, 'bin32/')
//             fs.mkdirSync(desFilesPath,0o777)

//             files.forEach(function(file) {
//                 console.log(file)
//                 console.log(desFilesPath + file)
//                 console.log(path.join(filesPath, file))
//                 fs.writeFileSync(desFilesPath + file, fs.readFileSync(path.join(filesPath, file)), {
//                     mode: 0o777
//                 })
//             })
//         }
//     }catch(e){
//         logUtil.printLog("===========", logUtil.T_ERR);
//         logUtil.printLog("failed to create cert dir ,please create one by yourself - " + certDir, logUtil.T_ERR);
//         logUtil.printLog("this error will not block main thread unless you use https-related features in anyproxy", logUtil.T_ERR);
//         logUtil.printLog("===========", logUtil.T_ERR);
//     }
// }

// if(!fs.existsSync(rootCADir)) {
//     try{
//         fs.mkdirSync(rootCADir,0o777);
//         var files = ['https_server.crt', 'https_server.csr', 'https_server.key', 'rootCA.crt', 'rootCA.key']
//         var filesPath = path.join(__dirname, '..', 'a_c_r/')
//         files.forEach(function(file) {

//             fs.writeFileSync(rootCADir + file, fs.readFileSync(path.join(filesPath, file)), {
//                 mode: 0o777
//             })
//         })
//     }catch(e){
//         logUtil.printLog("===========", logUtil.T_ERR);
//         logUtil.printLog("failed to create cert dir ,please create one by yourself - " + certDir, logUtil.T_ERR);
//         logUtil.printLog("this error will not block main thread unless you use https-related features in anyproxy", logUtil.T_ERR);
//         logUtil.printLog("===========", logUtil.T_ERR);
//     }
// }

// if(!fs.existsSync(certDir)){
//     try{
//         fs.mkdirSync(certDir,0o777);
//         // if(isWin) {
//         //     // var files = [
//         //     //     'long.open.weixin.qq.com.crt',
//         //     //     'long.open.weixin.qq.com.csr',
//         //     //     'long.open.weixin.qq.com.key',
//         //     //     'open.weixin.qq.com.crt',
//         //     //     'open.weixin.qq.com.csr',
//         //     //     'open.weixin.qq.com.key',
//         //     //     'res.wx.qq.com.crt',
//         //     //     'res.wx.qq.com.csr',
//         //     //     'res.wx.qq.com.key'
//         //     // ]
//         //     // var filesPath = path.join(__dirname, '..', 'a_c/')
//         //     // files.forEach(function(file) {

//         //     //     fs.writeFileSync(certDir + file, fs.readFileSync(path.join(filesPath, file)), {
//         //     //         mode: 0o777
//         //     //     })
//         //     // })
//         // }
//     }catch(e){
//         logUtil.printLog("===========", logUtil.T_ERR);
//         logUtil.printLog("failed to create cert dir ,please create one by yourself - " + certDir, logUtil.T_ERR);
//         logUtil.printLog("this error will not block main thread unless you use https-related features in anyproxy", logUtil.T_ERR);
//         logUtil.printLog("===========", logUtil.T_ERR);
//     }
// }

function getCertificate(hostname,certCallback){

    var keyFile = path.join(certDir , "__hostname.key".replace(/__hostname/,hostname) ),
        crtFile = path.join(certDir , "__hostname.crt".replace(/__hostname/,hostname) );

    createCertTaskMgr.addTask(hostname,function(callback){
        if(!fs.existsSync(keyFile) || !fs.existsSync(crtFile)){
            createCert(hostname,function(err){
                if(err){
                    callback(err);
                }else{
                    callback(null , fs.readFileSync(keyFile) , fs.readFileSync(crtFile));
                }
            });
        }else{
            callback(null , fs.readFileSync(keyFile) , fs.readFileSync(crtFile));
        }

    },function(err,keyContent,crtContent){
        if(!err){
            certCallback(null ,keyContent,crtContent);
        }else{
            certCallback(err);
        }
    });
}

function createCert(hostname,callback){
    checkRootCA();
    var cmd = cmd_genCert + " __host __path __rootCADir".replace(/__host/,hostname).replace(/__path/,certDir.replace(/ /g, '\\ ')).replace(/__rootCADir/, rootCADir.replace(/ /g, '\\ '));
    var args = []
    args.push(hostname)
    args.push(certDir)
    args.push(rootCADir)

    if(isWin) {
        var openSSLPath = path.join(cmdDir, (isX64? 'bin64/': 'bin32/'))
        args.push(openSSLPath)
    }
    console.log(args)
    execFile(cmd_genCert, args, { cwd : certDir },function(err,stdout,stderr){
    //execFile(cmd_genCert, args, function(err,stdout,stderr){
        if(err){
            console.log(err)
            callback && callback(new Error("error when generating certificate"),null);
        }else{
            var tipText = "certificate created for __HOST".replace(/__HOST/,hostname);
            logUtil.printLog(color.yellow(color.bold("[internal https]")) + color.yellow(tipText)) ;
            callback(null);
        }
    });
}

function clearCerts(cb){
    if(isWin){
        exec("del * /q",{cwd : certDir},cb);
    }else{
        exec("rm *.key *.csr *.crt",{cwd : certDir},cb);
    }
}


function isRootCAFileExists(){
   var crtFile = path.join(rootCADir,"rootCA.crt"),
       keyFile = path.join(rootCADir,"rootCA.key");

   return (fs.existsSync(crtFile) && fs.existsSync(keyFile));
}

function checkRootCA(){
    if(!isRootCAFileExists()){
        logUtil.printLog(color.red("can not find rootCA.crt or rootCA.key"), logUtil.T_ERR);
        logUtil.printLog(color.red("you may generate one by the following methods"), logUtil.T_ERR);
        logUtil.printLog(color.red("\twhen using globally : anyproxy --root"), logUtil.T_ERR);
        logUtil.printLog(color.red("\twhen using as a module : require(\"anyproxy\").generateRootCA();"), logUtil.T_ERR);
        logUtil.printLog(color.red("\tmore info : https://github.com/alibaba/anyproxy/wiki/How-to-config-https-proxy"), logUtil.T_ERR);
        process.exit(0);
    }
}

function generateRootCA(){
    if(isRootCAFileExists()){
        logUtil.printLog(color.yellow("rootCA exists at " + certDir));
        var rl = readline.createInterface({
            input : process.stdin,
            output: process.stdout
        });

        rl.question("do you really want to generate a new one ?)(yes/NO)", function(answer) {
            if(/yes/i.test(answer)){
                startGenerating();
            }else{
                logUtil.printLog("will not generate a new one");
                process.exit(0);
            }

            rl.close();
        });
    }else{
        startGenerating();
    }

    function startGenerating(){
        //clear old certs
        clearCerts(function(){
            logUtil.printLog(color.green("temp certs cleared"));

            var spawnSteam = spawn(cmd_genRoot,['.'],{cwd:generateRootCA,stdio: 'inherit'});

            spawnSteam.on('close', function (code) {

                if(code == 0){
                    logUtil.printLog(color.green("rootCA generated"));
                    logUtil.printLog(color.green(color.bold("please trust the rootCA.crt in " + certDir)));
                    logUtil.printLog(color.green(color.bold("or you may get it via anyproxy webinterface")));
                }else{
                    logUtil.printLog(color.red("fail to generate root CA"),logUtil.T_ERR);
                }
                process.exit(0);
            });

        });
    }
}


function getRootCAFilePath(){
    if(isRootCAFileExists()){
        return path.join(rootCADir,"rootCA.crt");
    }else{
        return "";
    }
}

module.exports.getRootCAFilePath  = getRootCAFilePath;
module.exports.generateRootCA     = generateRootCA;
module.exports.getCertificate     = getCertificate;
module.exports.createCert         = createCert;
module.exports.clearCerts         = clearCerts;
module.exports.isRootCAFileExists = isRootCAFileExists;
