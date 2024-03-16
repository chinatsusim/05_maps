// Firebaseからのデータ取得に必要な関数や変数をインポート
import { dbRef } from './firebaseApp.js';
import { onChildAdded } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';

// 地図初期化関数
let map;
function mapsInit(position) {
    const def_lat = 35.67236695599358; // デフォルトの緯度
    const def_lon = 139.76737557019078; // デフォルトの経度

    // Bmapによる地図の初期化
    const map = new Bmap("#myMap");
    map.startMap(def_lat, def_lon, "grayscale", 17);

    // const pin1 = map.pinLayer(35.67220985347213, 139.7669571452219, "#000000");

    console.log(dbRef);

    onChildAdded(dbRef, function(data){   
    const shop  = data.val();

    map.pinText(shop.lat, shop.lon, shop.shop,"ああ","花");    
    // map.pinLayer(shop.lat, shop.lon, "#ff0000");

    });
}

//2.位置情報の取得に失敗した場合の処理
function mapsError(error) {
    let e = "";
    if (error.code == 1) { e = "位置情報が許可されてません";}
    if (error.code == 2) { e = "現在位置を特定できません";}
    if (error.code == 3) { e = "位置情報を取得する前にタイムアウトになりました";}
    $("#map").html("エラー：" + e);
  };
  
  //3.位置情報取得オプション
  const option ={
    enableHighAccuracy: true, //より高精度な位置を求める
    maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
    timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
  };
  
  //Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
  function GetMap() {
      navigator.geolocation.getCurrentPosition(mapsInit, mapsError, option);
  };

  GetMap();