var engins = {};
engins["Yahoo"] = "http://search.yahoo.co.jp/search?p=";
engins["Google"] = "https://www.google.com/search?q=";
engins["Amazon"] =
  "https://www.amazon.co.jp/gp/search/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias%3Daps&field-keywords=";
engins["Google画像検索"] =
  "https://www.google.co.jp/search?newwindow=1&site=&tbm=isch&source=hp&q=";
engins["Bing"] = "https://www.bing.com/search?q=";
engins["YouTube"] = "https://www.youtube.com/search?q=";
engins["niconico"] = "https://www.nicovideo.com/";

init = engin => {
  const getData = getCustomEngines(data => {
    let resultData = data.custom;
    let viewEngins = document.getElementById("viewEngins");

    for (let site in data.custom) {
    } //ここでcustomサイトをenginsに登録する処理

    //enginsのサイトをポップアップに表示するループ
    for (let engin in engins) {
      console.log(engins[engin]);
      let html = `<input type="checkbox" name="engine" value="${engin}" />${engin} `;
      viewEngins.insertAdjacentHTML("afterbegin", html);
    }
  });
};

getCustomEngines = callback => {
  chrome.storage.sync.get("custom", callback);
};

document.getElementById("search").onclick = () => {
  const serchList = document.getElementsByName("engine");
  const serchWord = document.getElementById("keyword").value;
  //チェックされた値を取得して検索
  for (let i = 0; i < serchList.length; i++) {
    if (serchList[i].checked) {
      const selectEngine = serchList[i].value;
      const margeURL = `${engins[selectEngine]}${serchWord}`;
      chrome.tabs.create({ url: margeURL });
    }
  }
};

window.onload = () => {
  init();
};
