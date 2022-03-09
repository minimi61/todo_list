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

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll('.task-tabs div');
let underLine = document.getElementById('under-line');
console.log(underLine);
let mode = 'all'
let taskList = [];
let filterList = [];
addButton.addEventListener("mousedown", addTask)
taskInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13)
        addTask()
})


for (let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener('click', function (e)
    { filter(e) })
}
console.log(tabs)

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task)
    console.log(taskList);
    render();
}

function render() {
    
    let resultHTML = '';
    list = [];
    if (mode == 'all') {
        list = taskList;
    } else if (mode == 'ongoing'|| mode == "done") {
        list = filterList;
    }
    for (let i = 0; i < list.length; i++){
        if (list[i].isComplete == true) {
            resultHTML += 
            `<div class="task task-done">
                <span>${list[i].taskContent}</span>
                <div class="button-box">
                <button onclick="toogleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div>`
        } else {
            resultHTML += 
            `<div class="task">
            <span>${list[i].taskContent}</span>
                <div class="button-box">
                <button onclick="toogleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
                </div>
            </div>`
        }
    }

    document.getElementById('task-board').innerHTML = resultHTML;

}

function toogleComplete(id) {
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    //왜 filter 함수로 해야할까?
    
    console.log(taskList)
}

function filter(e) {
    if (e) {
        mode = e.target.id
        underLine.style.left = e.currentTarget.offsetLeft + 'px';
        underLine.style.width = e.currentTarget.offsetWidth + 'px';
        underLine.style.top =
            e.currentTarget.offsetTop + (e.currentTarget.offsetHeight-4)+ 'px';
    }

    filterList=[];
    // console.log("필터 클릭", event.target.id)
    if (mode == "all") {
        render()
    }else if(mode=="ongoing"){
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
        render( )
    } else if (mode == "done") {
        for (let i = 0; i < taskList.length; i++){
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i])
            }
        }render()
    }
    console.log(filterList)
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1);
            break;
        }
    }
    filter()    
}