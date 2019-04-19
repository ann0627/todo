// Start init setting
var project = {
    'pid': 0,
    'title': null,
    'endtime': null,
    'updatetime': null,
    'states': null
};

var task = {
    'tid': 0,
    'pid': 0,
    'title': null,
    'endtime': null,
    'updatetime': null,
    'comment': [],
    'tag': [],
    'assign': null,
    'states': null
};

var tag = {
    'tid': 0,
    'name': null,
    'color': null
}

// get localStorage
let projectJson = JSON.parse(localStorage.getItem("project")) || [];
let projectTaskJson = JSON.parse(localStorage.getItem("project-task")) || [];

// Start template
// 專案修改模板
function getProjectInputTemplate(len = null) {
    let data = '';
    let template;

    projectJson.forEach((element, index) => {
        let info = `
            <div class="project_item">
                <div class="project_item_header">
                    <input class="project_item_title" type="text" value="` + element.title + `">
                    <input class="project_item_endtime" type="date" value="` + element.endtime + `">
                    <div class="project_ctrl">
                        <button class="remove-project-task" onclick="deleteProjectList(` + element.pid + `,` + index + `)">X</button>
                        <button class="" onclick="updateProjectList(` + index + `)">確定</button>
                    </div>
                </div>
                <div class="project_item_body">
                    <div class="project_task_list">` + getProjectTaskTemplate(element.pid) + `</div>
                    <input class="project_item_task" type="text" placeholder="task">
                    <div class="project_task_ctrl">
                        <button class="" onclick="setInputProjectTaskVal(` + element.pid + `,` + index + `)">確定</button>
                    </div>
                </div>
            </div><br/>
        `;

        if (len !== null && len === index) {
            data = info;
        } else {
            data += info;
        }
    });

    template = data;
    return template;
}

// 專案子任務模板
function getProjectTaskTemplate(pid = null, index = null) {
    let data = '';
    let template;

    if (index === null) {
        let result = projectTaskJson.filter(element => element.pid === pid);

        result.forEach((element, index) => {
            let info = `
                <input class="project_task_item" value="` + element.pid + `" />
                <button class="remove-project-task" onclick="deleteProjectTaskList(` + index + `)">X</button>
                <button class="" onclick="updateProjectTaskList(` + element.pid + `)">確定</button><br/>
            `;
            data += info;
        });
    } else {
        let $projectItem = document.querySelectorAll('project_item')[index];
    }

    template = data;
    return template;
}

// Start 專案資料
// 建立 project 資料
function setInputProjectVal() {
    var projectTitle = document.querySelector('#project_title');
    var projectEndtime = document.querySelector('#project_endtime');

    if (projectTitle.value != '') {
        projectJson.push({
            'pid': projectJson.length === 0 ? 1 : projectJson[projectJson.length - 1].pid + 1,
            'title': projectTitle.value,
            'endtime': projectEndtime.value,
            'updatetime': null,
            'states': null,
        })
        localStorage.setItem("project", JSON.stringify(projectJson));

        appendProjectList(projectJson.length);
    } else {
        console.log('請填寫名稱');
    }
}

// loading 讀取 project list
function loadProjectList() {
    let $list = document.querySelector('#project_list');
    $list.insertAdjacentHTML('beforeend', getProjectInputTemplate());
}

// append new project item
function appendProjectList(len = null) {
    let $ul = document.querySelector('#project_list');
    if (len !== null) {
        $ul.insertAdjacentHTML('beforeend', getProjectInputTemplate(len - 1));
    }
}

// delete project list
function deleteProjectList(pid, index) {
    // 刪除專案
    projectJson.splice(index, 1);
    localStorage.setItem("project", JSON.stringify(projectJson));
    // 刪除專案子任務
    projectTaskJson = projectTaskJson.filter(element => element.pid !== pid);
    localStorage.setItem("project-task", JSON.stringify(projectTaskJson));

    loadProjectList();
}

// update project list
function updateProjectList(index) {
    let $projectTitle = document.querySelectorAll('.project_item_title');
    let $projectEndtime = document.querySelectorAll('.project_item_endtime');
    // 標題
    projectJson[index].title = $projectTitle[index].value;
    // 完成時間
    projectJson[index].endtime = $projectEndtime[index].value;

    localStorage.setItem("project", JSON.stringify(projectJson));
}

// Start 專案子任務
// 建立 project 資料
function setInputProjectTaskVal(pid, index = null) {
    var projectTaskTitle = document.querySelectorAll('.project_item_task');

    if (projectTaskTitle.value !== '') {
        projectTaskJson.push({
            'tid': projectTaskJson.length === 0 ? 1 : projectTaskJson[projectTaskJson.length - 1].tid + 1,
            'pid': pid,
            'title': projectTaskTitle.value,
            'endtime': null,
            'updatetime': null,
            'comment': [],
            'tag': [],
            'assign': null,
            'states': true
        })
        localStorage.setItem("project-task", JSON.stringify(projectTaskJson));

        getProjectTaskTemplate(pid, index);

    } else {
        console.log('請填寫子任務');
    }
}

// update project list
// function updateProjectTaskList(pid, index) {
//     let $projectTitle = document.querySelectorAll('.project_item_title');
//     let $projectEndtime = document.querySelectorAll('.project_item_endtime');

//     setInputProjectTaskVal(pid);
//     // 標題
//     projectJson[index].title = $projectTitle[index].value;
//     // 完成時間
//     projectJson[index].endtime = $projectEndtime[index].value;

//     localStorage.setItem("project-task", JSON.stringify(projectTaskJson));
// }

// document ready
const callback = function () {
    loadProjectList();
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}