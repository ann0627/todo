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

// Start template
// 專案修改模板
function getProjectInputTemplate(title) {
    var template = `<ul class="project_ul"><li class="test">` + title + `</li></ul>`;
    return template;
}

// get localStorage
let localData = JSON.parse(localStorage.getItem("project")) || [];


// Start 專案資料
// 取得 新增專案資料
function setInputProjectVal() {
    var projectName = document.querySelector('#project-name');
    var projectEndtime = document.querySelector('#project-endtime');

    if (projectName.value != '') {
        localData.push({
            'pid': localData.length + 1,
            'title': projectName.value,
            'endtime': projectEndtime.value,
            'updatetime': null,
            'states': null,
        })
        localStorage.setItem("project", JSON.stringify(localData));

        updateProjectList(localData.length);
    } else {
        alert('請填寫名稱');
    }
}

// update 
function updateProjectList(len) {
    let ul = document.querySelector('#project_list .project_ul');
    let li = document.createElement('li');

    ul.innerHTML = getProjectInputTemplate(localData[len-1].title);
    // li.appendChild(document.createTextNode(localData[len-1].title));
    // ul.appendChild(li);
}

// loading 讀取專案列表
function loadProjectList() {
    let list = document.querySelector('#project_list');
    // 建立ul
    let ul = list.querySelector('.project_ul');
    console.lo
    // let li;

    localData.forEach((element, index) => {
        // li = document.createElement('li');
        // li.appendChild(document.createTextNode(element.title));
        // ul.appendChild(li);

        getProjectInputTemplate(element.title);
    });

    // list.appendChild(ul);
}

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