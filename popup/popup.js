getSerchEngines = engin => {
  let engins = {};
  engins["yahoo"] = "http://search.yahoo.co.jp/search?p=";
  engins["google"] = "https://www.google.com/search?q=";
  engins["amazon"] =
    "https://www.amazon.co.jp/gp/search/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias%3Daps&field-keywords=";
  engins["googleImage"] =
    "https://www.google.co.jp/search?newwindow=1&site=&tbm=isch&source=hp&q=";
  const getData = getCustomEngines(data => {}, engins);
  console.log(getData);
  return engins;
};

getCustomEngines = (callback, engins) => {
  chrome.storage.sync.get("custom", callback);
};

document.getElementById("search").onclick = () => {
  const serchList = document.getElementsByName("engine");
  const engines = getSerchEngines();
};
