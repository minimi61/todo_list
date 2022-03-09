//유저가 값을 입력
//+ 입력하면 할일이 추가
//delete 버튼 누르면 할일 삭제
//check 누르면 할일이 끝나면서 밑줄이 간다
//1.check 버튼 클릭하는 순간 true, false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은, 끝난 아이템만, 진행중 탭은 진행중 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴
let textInput = document.getElementById("text_input");
let addButton = document.getElementById("add_button");
let sendList = [];
let taskUpdate = document.getElementById("task_update");
addButton.addEventListener("click", send);

function send() {
    let useInput = textInput.value;
    sendList.push(useInput);
    console.log(sendList);

    render();
}

function render() {
    let result = "";

    sendList.forEach((i) => {
        result +=`<div class="task_update" id="task_update">
        <div id="update">${textInput.value}</div>
        <div class="buttons">
            <button id="check"><i class="fa-solid fa-check"></i></button>
            <button id="delete"><i class="fa-solid fa-trash-can"></i></button>
        </div> 
        </div>`;
    })
    console.log(result)
    document.getElementById("task-board").innerHTML = result;
}