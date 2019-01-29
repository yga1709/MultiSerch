document.getElementById("save").onclick = () => {
  const siteName = document.getElementById("engineName").value;
  const siteUrl = document.getElementById("engineUrl").value;
  //カンマ区切りのサイト一覧を読み込み＆パース
  const sitesArray = siteName.split(",");
  const sitesUrl = siteUrl.split(",");
  const setData = {};
  if (sitesArray.length == sitesUrl.length) {
    //カンマ区切りのサイトを1件ずつ登録
    for (let i = 0; i < sitesArray.length; i++) {
      setData[sitesArray[i]] = { name: sitesArray[i], url: sitesUrl[i] };
    }
  } else {
    console.log("error");
  }

  chrome.storage.sync.set(
    {
      custom: JSON.stringify(setData)
    },
    function() {
      console.log(JSON.stringify(setData));
      console.log(Object.keys(setData).length);
    }
  );
};
