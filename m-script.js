document.getElementById("omikujiButton").addEventListener("click", function () {
  // 役満集
  const items = [
    {
      title: "大三元",
      detail: "三元牌の刻子を揃えた役。",
      img: "img/daisangen.jpg",
    },
    {
      title: "四暗刻",
      detail: "暗刻を4つ作った役。",
      img: "img/suanko.jpg",
    },
    {
      title: "字一色",
      detail: "全ての牌が風牌・三元牌で構成された役。",
      img: "img/tsuiso.jpg",
    },
    {
      title: "緑一色",
      detail: "全ての牌が緑色で構成された役。",
      img: "img/ryuiso.jpg",
    },
    {
      title: "清老頭",
      detail: "老頭牌のみで構成された役。",
      img: "img/chinroto.jpg",
    },
    {
      title: "九蓮宝燈",
      detail: "1,1,1,2,3,4,5,6,7,8,9,9,9の同じ種類の牌で構成された役。",
      img: "img/churen.jpg",
    },
    {
      title: "四槓子",
      detail: "槓子を4つ作った役。",
      img: "img/sukantsu.jpg",
    },
    {
      title: "国士無双",
      detail: "国士無双の条件を満たした役。",
      img: "img/kokushi.jpg",
    },
    {
      title: "大四喜",
      detail: "四喜牌の刻子を揃えた役。",
      img: "img/daisushi.jpg",
    },
    {
      title: "小四喜",
      detail: "四喜牌の刻子を3つと雀頭を揃えた役。",
      img: "img/shosushi.jpg",
    },
  ];
  // ボタンを読み込む
  const omikujiButton = document.getElementById("omikujiButton");
  const postToXButton = document.getElementById("postToXButton");

  // ボタンの初期設定
  omikujiButton.disabled = true; // おみくじボタンを無効化
  postToXButton.classList.add("hidden"); // ポストボタンを非表示にする

  // スピン処理に必要な変数を作成
  let index = 0; // 現在の公演情報を保持
  let count = 0; // 現在の回転数を保持
  let maxCount = 20; // 最大回転回数
  let speed = 50; // 初期回転速度

  // ---スピン処理ここから---
  function spin() {
    if (count < maxCount) {
      // おみくじの内容をランダムに変更
      index = Math.floor(Math.random() * items.length);

      // おみくじの内容を画面に表示
      document.getElementById("omikujiTitle").textContent = items[index].title;
      document.getElementById("omikujiDetails").textContent = items[index].detail;
      document.getElementById("omikujiImg").src = items[index].img;

      count++;

      // 回転の速度を徐々に遅くする
      speed += 5;
      setTimeout(spin, speed); // 繰り返す
    } else {
      // 最終結果の公演情報を取得
      const finalItem = items[index];
      // 最終結果の表示
      document.getElementById("omikujiTitle").textContent = finalItem.title;
        document.getElementById("omikujiDetails").textContent = finalItem.detail;
        document.getElementById("omikujiImg").src = finalItem.img;

      // ボタンを有効化/表示する設定
      omikujiButton.disabled = false; // おみくじボタンを有効化
      postToXButton.classList.remove("hidden"); // ポストボタンを表示
      postToXButton.disabled = false; // ポストボタンを有効化

      // Xにポストするボタンを押したときの処理開始
      postToXButton.addEventListener("click", function () {
        // Xにポスト
        postToX(finalItem);
      });
    }
  }
  // ---スピン処理ここまで---

  // スピン処理開始
  spin();
});

function postToX(finalItem) {
  const postText = `#麻雀おみくじ の結果は\n 「${finalItem.title}」でした！\n\n麻雀おみくじはこちら\nhttps://bearl27.github.io/omikuji/\n\n`;

  // 改行を含むテキストをURLエンコード
  const encodedText = encodeURIComponent(postText);

  // X投稿用のURLを生成
  const postUrl = `https://x.com/intent/tweet?text=${encodedText}`;

  // 新しいウィンドウでツイートページを開く
  window.open(postUrl, "_blank");
}
