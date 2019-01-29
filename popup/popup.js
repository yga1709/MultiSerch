var engins = {};
engins["Yahoo"] = "http://search.yahoo.co.jp/search?p=";
engins["Google"] = "https://www.google.com/search?q=";
engins["Amazon"] =
  "https://www.amazon.co.jp/gp/search/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias%3Daps&field-keywords=";
engins["Google画像検索"] =
  "https://www.google.co.jp/search?newwindow=1&site=&tbm=isch&source=hp&q=";
engins["Bing"] = "https://www.bing.com/search?q=";
engins["YouTube"] = "https://www.youtube.com/search?q=";
engins["niconico"] = "https://www.nicovideo.jp/search/";

window.onload = () => {
  init();
};

init = engin => {
  const getData = getCustomEngines(data => {
    let resultData = data.custom;
    try {
      resultData = JSON.parse(resultData);
      for (let site in resultData) {
        console.log(resultData[site].name);
        engins[resultData[site].name] = resultData[site].url;
        console.log(resultData[site].url);
      }
      viewEngins();
    } catch (e) {
      console.log("localStorageにデータが存在しません。");
      viewEngins();
    }
    //ここでcustomサイトをenginsに登録する処理
  });
};

viewEngins = () => {
  let viewEngins = document.getElementById("viewEngins");
  let html;
  for (let engin in engins) {
    html = `<span id="${engin}"><input type="checkbox" name="engine" value="${engin}"/>${engin}</span>`;
    viewEngins.insertAdjacentHTML("afterbegin", html);
  }
};

getCustomEngines = callback => {
  chrome.storage.sync.get("custom", callback);
};

getChecked = checkElm => {
  const checkList = document.getElementsByName(checkElm);
  const checkedArray = [];
  for (let i = 0; i < checkList.length; i++) {
    if (checkList[i].checked) {
      checkedArray.push(checkList[i].value);
    }
  }
  return checkedArray;
};

document.getElementById("search").onclick = () => {
  const serchWord = document.getElementById("keyword").value;
  if (!serchWord) return 0;
  const serchList = getChecked("engine");
  for (let engin of serchList) {
    const margeURL = `${engins[engin]}${serchWord}`;
    chrome.tabs.create({ url: margeURL });
  }
};

document.getElementById("delete").onclick = () => {
  const deleteList = getChecked("engine");

  let check = confirm("削除しますか？");
  if (!check) return 0;

  for (let del of deleteList) {
    delete engins[del];
    let elem = document.getElementById(del);
    elem.parentElement.removeChild(elem);
    chrome.storage.sync.remove(del, data => {
      console.log("Successfully deleted", data);
    });
    chrome.storage.sync.clear();
  }
};

document.getElementById("original1").onclick = () => {};

document.getElementById("original2").onclick = () => {};

document.getElementById("original3").onclick = () => {};

document.getElementById("addOriginal").onclick = () => {
  const selectOriginal = getChecked("original");
  const selectCheckList = getChecked("engine");
  setOriginal();
};
setOriginal = (name, originalArray) => {
  chrome.storage.sync.set(
    {
      name: originalArray
    },
    function() {}
  );
};
