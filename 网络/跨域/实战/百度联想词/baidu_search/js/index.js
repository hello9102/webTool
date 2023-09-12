(function (doc) {
  let searchInput = doc.getElementsByClassName("J_searchInput")[0],
    wdList = doc.getElementsByClassName("J_wdList")[0],
    listWrap = wdList.parentNode,
    listTpl = doc.getElementById("J_listTpl").innerHTML;

  let init = function () {
    bindEvent();
  };

  function bindEvent() {
    searchInput.addEventListener("input", typeInput, false);
  }

  function renderList(value) {
    let list = "",
      data = value.s,
      len = data.length,
      val = _trimSpace(searchInput.value);

    if (len) {
      data.forEach((elem, idx) => {
        if (idx <= 3) {
          list += listTpl.replace(/{{(.*?)}}/g, (node, key) => {
            return {
              wdLink: elem,
              wd: _setWdStyle(val, elem),
            }[key];
          });
        }
      });

      wdList.innerHTML = list;
      listWrap.style.display = "block";
    } else {
      wdList.innerHTML = "";
      listWrap.style.display = "none";
    }
  }

  function typeInput() {
    let val = _trimSpace(this.value),
      len = val.length;

    if (len > 0) {
      getDatas(val);
    } else {
    }
  }

  function getDatas(value) {
    $.ajax({
      url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + value,
      type: "GET",
      dataType: "JSONP",
      jsonp: "cb",
      success: function (data) {
        renderList(data);
      },
    });
  }

  function _trimSpace(str) {
    return str.replace(/\s+/g, "");
  }

  function _setWdStyle(value, word) {
    return (
      "<span class='font-normal'>" + value + "</span>" + word.replace(value, "")
    );
  }

  init();
})(document);
