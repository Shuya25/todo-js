import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  // テキストボックスの値を元に未完了リストに追加する
  addIncompleteList(inputText);
};

const addIncompleteList = (text) => {
  // li, divなどのタグを生成し、クラス名を指定、内容を入力
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.innerText = text;

  // 完了ボタンタグの生成、イベント付与
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () =>
    onClickComplete(completeButton)
  );
  // 削除ボタンタグの生成、イベント付与
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => onClickDelete(deleteButton));

  // liの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

const onClickComplete = (completeButton) => {
  // 押された削除ボタンの親ノードの親ノードを削除
  const deleteTarget = completeButton.parentNode.parentNode;
  document.getElementById("incomplete-list").removeChild(deleteTarget);

  // 完了リストに追加
  const completeTarget = completeButton.parentNode;
  const text = completeTarget.firstChild.innerText;
  completeTarget.textContent = null; // div以下を初期化
  const p = document.createElement("p");
  p.innerText = text;
  const li = document.createElement("li");
  const backButton = document.createElement("button");
  backButton.innerText = "戻す";
  backButton.addEventListener("click", () => onClickBack(backButton));
  li.appendChild(completeTarget);
  completeTarget.appendChild(p);
  completeTarget.appendChild(backButton);
  document.getElementById("complete-list").appendChild(li);
};

const onClickBack = (backButton) => {
  // 完了リストから削除
  const backTarget = backButton.parentNode.parentNode;
  document.getElementById("complete-list").removeChild(backTarget);

  // テキストから未完了リストの要素を作成
  const text = backTarget.firstChild.firstChild.innerText;
  addIncompleteList(text);
};

const onClickDelete = (deleteButton) => {
  // 押された削除ボタンの親ノードの親ノードを削除
  const deleteTarget = deleteButton.parentNode.parentNode;
  document.getElementById("incomplete-list").removeChild(deleteTarget);
};

document
  .getElementById("add-button")
  .addEventListener("click", onClickAdd, false);
