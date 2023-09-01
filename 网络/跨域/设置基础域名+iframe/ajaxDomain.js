let ajaxDomain = (function () {
  function createIframe(frameId, frameUrl) {
    let frame = document.createElement("iframe");
    frame.src = frameUrl;
    frame.id = frameId;
    frame.style.display = none;

    return frame;
  }

  return function (opt) {
    document.domain = opt.basicDomain;
    let frame = createIframe(opt.frameId, opt.frameUrl);

    frame.onload = function () {
      //获取iframe页面的ajax方法
      let $$ = document.getElementById(opt.frameId).contentWindow.$;

      $$.ajax({
        url: opt.url,
        type: opt.type,
        data: opt.data,
        success: opt.success,
        error: opt.error,
      });
    };
    document.body.appendChild(frame);
  };
})();

ajaxDomain({
  basicDomain: "基础域名",
  frameUrl: "请求哪个页面的地址",
  url: "接口地址",
  type: "POST",
  data: {
    status: 1,
  },
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.log(0);
  },
});

//设置基础域名+iframe这个跨域方法，如果域名是http://test.baidu.com/index.html，可以把document.domain设置成'jsplusplus.com'吗，ta b去发起请求吗
