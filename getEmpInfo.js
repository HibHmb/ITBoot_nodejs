// requireの設定
const mysql = require("mysql");

module.exports = getEmpInfo = (res, data) => {
  // MySQLとのコネクションの作成
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "THEsurume28",
    database: "it_boot_schema",
  });

  // 接続
  connection.connect();

  // 返値
  let changeData = "";

  // userdataの取得
  connection.query("SELECT * from mst_emp_info;", function (err, rows, fields) {
    if (err) {
      console.log("err: " + err);
    }
    const header = ["社員番号", "名前", "年齢", "備考"];

    // ヘッダー追加
    changeData += "<tr>";
    header.forEach((element) => {
      changeData += `<th>${element}</th>`;
    });
    changeData += "</tr>";

    // データ追加
    rows.forEach((row) => {
      changeData += "<tr>";
      changeData += `<th>${row.id}</th>`;
      changeData += `<th>${row.name}</th>`;
      changeData += `<th>${row.age}</th>`;
      changeData += `<th>${row.remarks}</th>`;
      changeData += "</tr>";
    });

    // レスポンス設定
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data.replace("tabledate", changeData));
    res.end();
  });

  // 接続終了
  connection.end();
};
