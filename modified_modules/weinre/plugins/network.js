window.onload = function() {

  // 阻止掉默认的样式
  var cssStr = `
  #main-panels .network div{
    display: none
  }
  #networkIframe {
    width: 100%;
    height: 100%;
  }
  #network-filter {
    display:none;
  }
  `

  var style = document.createElement('style')
  style.innerText = cssStr
  document.head.appendChild(style)

  var networkButton = document.querySelector('#toolbar .network')

  networkButton.addEventListener('click', function() {

    var statusBar = document.querySelector('#main-status-bar')
    statusBar.lastElementChild.style.display = "none"

    var networkIframe = document.getElementById('networkIframe')
    if(networkIframe)
      return

    var iframe = document.createElement('iframe')
    //iframe.src = 'http://localhost:' + 8002
    iframe.src = 'http://localhost:${global._weinrePort}'
    iframe.id = 'networkIframe'

    var networkPanenl = document.querySelector('#main-panels .network')
    networkPanenl.appendChild(iframe)

  })


}