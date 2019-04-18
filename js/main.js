// init setting
var project = {
    'id': 0,
    'name': null,
    'endtime': null,
    'updatetime': null,
    'states': null,
};

// get localStorage
var localData = JSON.parse(localStorage.getItem("project")) || [];


// Start 專案資料
// 取得 新增專案資料
function setInputProjectVal() {
    var projectName = document.getElementById('project-name');
    var projectEndtime = document.getElementById('project-endtime');

    if (projectName.value != '' || projectEndtime.value != '') {
        localData.push({
            'id': localData.length + 1,
            'name': projectName.value,
            'endtime': projectEndtime.value,
            'updatetime': null,
            'states': null,
        })
        localStorage.setItem("project", JSON.stringify(localData));

        updateProjectList();ZaSDSWER667
    } else {
        alert('請填寫名稱與日期');
    }
}

// 更新 專案列表
function updateProjectList() {
    var list = document.getElementById('project_list');
    // 建立ul
    var ul = document.createElement('ul');
    ul.setAttribute("class", "project-ul");
    var li;

    localData.forEach((element, index) => {
        li = document.createElement('li');
        li.appendChild(document.createTextNode(element.name));
        ul.appendChild(li);
    });

    document.getElementById('project_list').innerHTML(ul);

    console.log(document.getElementById('project_list'));
}

updateProjectList();