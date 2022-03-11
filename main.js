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
let underLine = document.querySelectorAll(".under-line");
let tabs = document.querySelectorAll(".task div");
let filteredList = [];
// console.log(tabs);

// let deleteBox = document.getElementById("d_delete"); 
addButton.addEventListener("click", send);
// deleteBox.addEventListener("click", deleteCheck);
//위에 addEventListener이 왜 null로 나타날까?

for (let i = 1; i < tabs.length; i++){
    // console.log(tabs[i].textContent)
    tabs[i].addEventListener("click", filter);
}

function send() {
    let useInput = textInput.value;
    let task = {
        taskcontent: useInput,
        isComplete: false,
        id: random(),
    };
    sendList.push(task);
    console.log(sendList);
    // textInput.value = '';
    render();
}

function render() {
    let result = "";

    for (let i = 0; i < sendList.length; i++) {
        if (sendList[i].isComplete == true) {
            result += 
            `<div class="task-done task_update" id="task_update">
        <span id="update">${sendList[i].taskcontent}</span>
        <div class="buttons">
        <button onclick="taskCheck('${sendList[i].id}')"><i class="fa-solid fa-check"></i></button>
        <button onclick="taskDelete('${sendList[i].id}')"id="d_delete"><i class="fa-solid fa-trash-can"></i></button>
        </div> 
        </div>`;
        } else {
            result += `<div class="task_update" id="task_update">
        <span id="update">${sendList[i].taskcontent}</span>
        <div class="buttons">
            <button onclick="taskCheck('${sendList[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="taskDelete('${sendList[i].id}')"id="d_delete"><i class="fa-solid fa-trash-can"></i></button>
        </div> 
        </div>`;
        }
    }
    // sendList.forEach((i) => {
    //     // if (sendList[i].isComplete ==true ) 
    //     // {
    //         result += `<div class="task_update" id="task_update">
    //     <div id="update">${sendList[i].taskcontent}</div>
    //     <div class="buttons">
    //         <button onclick="taskCheck('${sendList[i].id}')"><i class="fa-solid fa-check"></i></button>
    //         <button onclick="taskDelete()"id="d_delete"><i class="fa-solid fa-trash-can"></i></button>
    //     </div> 
    //     </div>`;
        // }
        // else {result += `<div class="task_update" id="task_update">
        // <div id="update">${sendList[i].content}</div>
        // <div class="buttons">
        //     <button onclick="taskCheck()"><i class="fa-solid fa-check"></i></button>
        //     <button onclick="taskDelete()"id="d_delete"><i class="fa-solid fa-trash-can"></i></button>
        // </div> 
        // </div>`;
        // }
    // })
    // console.log(result);
    document.getElementById("task-board").innerHTML = result;
}

function taskCheck(id) {
    // console.log("체크했다?!",id)
    for (let i = 0; i< sendList.length;i++) {
        if (sendList[i].id == id) {
            sendList[i].isComplete = !sendList[i].isComplete;
            break;
        }
    }
    // console.log(sendList)
    render()
}
function taskDelete(id) {
    console.log("삭제")
    for (let i=0; i < sendList.length; i++){
        if (sendList[i].id == id) {
            sendList.splice(i,1)
        }
    }
    render();
}
// function deleteCheck() {
//     console.log("이것도?")
// }

function filter() {
    if (tabs.textContent === "진행중") {
        for (let i = 0; i < sendList.length; i++){
            if (sendList[i].isComplete == false) {
                filteredList.push(sendList[i])
            }
        }
    }
    else if (tabs.textContent === "완료") {
        for (let i = 0; i < sendList.length; i++){
            if (sendList[i].isComplete) {
                filteredList.push(sendList[i])
            }
        }
        console.log("과연!")
    }
    render();
};

function random() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
