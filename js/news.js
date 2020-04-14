//宣告
let menuItem = document.querySelectorAll('.m-menu-item');
let _buttonSave = document.querySelector('.button-save');


let Alltext = document.querySelector('.task-title').value;

window.onload = function() {
    menuClick();
    todo(); //get method
    tabCLick();
    del();
    btnDel();


}

//Applications監聽
_buttonSave.addEventListener('click', post);
// _text.addEventListener('keydown', addData);


let todoArr = {};

function todo() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        redirect: 'follow'
    };
    fetch("http://localhost:3000/todos", requestOptions)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.JSON();
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            //解析成一個

        })
        .then(data => {

            // let Ndata = JSON.parse(JSON.stringify(data));

            todoArr = data;
            console.log(todoArr);


            // let adata = data.map(d => {
            //     //console.log(d);
            //     let tmp = d;
            //     for (let k in d) {
            //         if (k.length > 20) {
            //             tmp = JSON.parse(k);
            //         }
            //     }
            //     return tmp
            // })
            // console.log(adata);
            render(todoArr);


            //addData(data);
            // getPencil();



            const checkboxes = document.querySelectorAll('.task-col-first input[type="checkbox"]');
            console.log(checkboxes);

            function handleCheck(e) {
                console.log(e);
            }
            Array.from(checkboxes).map(el => el.addEventListener('click', handleCheck));



        })
        .catch(function(error) {
            return error.response;
        });
}

let render = (datas) => {
    let totalTak = document.querySelector('.total-task');
    let Taskblock = document.querySelector('.taskblock');

    datas.forEach(data => {

        let oDiv = document.createElement(`div`);

        oDiv.className = "task";
        oDiv.id = `${data.id}`;
        oDiv.innerHTML = `
              <div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox" id="okbox" name="checkbox" >
                    <i class="fas fa-square" ></i>
                </label>
                    </div>
                    <div class="task-col task-col-title" >
                        <input type="text" class="task-title" placeholder="feed my rabbit." value="${data.title}" >
                        <div class="task-info">
                            <div class="task-col">
                                <i class="far fa-calendar-alt"></i>
                                <span>${data.date}</span>
                            </div>
                               <div class="task-col">
                                <i class="far fa-file"></i>
                            </div>
                            <div class="task-col">
                                <i class="far fa-comment-dots"></i>
                            </div>
                        </div>
                    </div>
                    <div class="task-col task-col-last">
                        <i class="far fa-star"></i>
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                </div> 

           <!-- task detail -->
                 <div class="task-detail">
                    <div class="task-form">
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-calendar-alt"></i>
                                <span>Deadline</span>
                            </div>
                            <div class="task-form-body">
                                <div class="task-form-date">
                                    <input type="date" value="${data.date}">
                                    <input type="time" value="${data.time}">
                                </div>
                            </div>
                        </div>
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-file"></i>
                                <span>File</span>
                            </div>
                            <div class="task-form-body">
                                <label class="task-form-file">
                            <input type="file">
                            <i class="fas fa-plus"></i>
                        </label>
                            </div>
                        </div>
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-comment-dots"></i>
                                <span>Comment</span>
                            </div>
                            <div class="task-form-body">
                                <div class="task-form-textarea">
                                    <textarea placeholder="Type Your Blahblahblah in here..."> ${data. comment}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-form-submit">
                        <a class="button button-cancel">
                            <i class="fas fa-times"></i>
                            <span>Cancel</span>
                        </a>
                        <a class="button button-save">
                            <i class="fas fa-check"></i>
                            <span>Save</span>
                        </a>
                    </div>
                </div>  
                
        `;
        Taskblock.appendChild(oDiv);

    })
    console.log(datas.length);
    let sum = datas.length;
    totalTak.innerHTML = `${sum} task left`;
    getEdit();
    btnDel();
    checkbox();
    getStar();
}


//第一個輸入鍵
function tabCLick() {
    let firstContent = document.querySelector('#js-content');
    firstContent.addEventListener('click', function() {
        document.querySelector('.task.task-add').classList.toggle('is-open');
    })

}
//

//第一個 刪除鍵
function del() {
    let deleteX = document.querySelector('.fas.fa-times');
    deleteX.addEventListener('click', function(e) {
        document.querySelector('.task.task-add').classList.remove('is-open');
    })
}

//紅色cancel 
function btnDel() {
    let buttonCancel = document.getElementsByClassName('button-cancel');
    Array.from(buttonCancel).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.remove('is-open');
        });
    });

}

//edit icon  for toggle
function getEdit() {
    let pencil = document.getElementsByClassName('fa-pencil-alt');
    Array.from(pencil).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-open');



        });
    });
}

//點擊就有刪除線
function checkbox() {
    let taskCheckbox = document.querySelectorAll('.fa-square');


    Array.from(taskCheckbox).forEach(el => {
        el.addEventListener('click', function(e) {


            if (e.target.className !== `fas fa-square`) {
                return;
            }
            // console.dir(inputText);

            let inputText = this.parentNode.parentNode.parentNode.parentNode;
            // inputText.classList.toggle('is-done');
            console.log(this.parentNode.parentNode.parentNode.parentNode);

            if (inputText.className !== "task is-done") {
                inputText.className = "task is-done";
            } else {
                inputText.className = "task";
            }


        }, false)


    })


}

//點擊星星
function getStar() {
    let star = document.getElementsByClassName('fa-star');
    Array.from(star).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-highlight');
        });

    });
}
// function render(datas) {
//     console.log(datas);

// }

function post() {

    let text = document.querySelector('.task-title').value;
    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').textContent;

    let Adata = {

    }
    Adata.title = text;
    Adata.date = date;
    Adata.time = time;
    Adata.filte = files;
    Adata.comment = textarea;
    Adata.star = true;
    Adata.id = this.id;
    Adata.isCompleted = true;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    //撈出輸入鍵的值
    urlencoded.append("title", Alltext);
    urlencoded.append("date", date);
    urlencoded.append("time", time);
    urlencoded.append("isCompleted", false);
    urlencoded.append("comment", textarea);
    urlencoded.append("filte", files);
    urlencoded.append("star", false);


    console.log(Adata);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: encodeURI(JSON.stringify(Adata)),
        redirect: 'follow'
    };

    fetch("https://fathomless-brushlands-42339.herokuapp.com/todo3", requestOptions)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.JSON(); //解析成一個json 物件
            } else {
                var error = new Error(response.statusText)
                error.response = response;
                throw error;
            }


        })
        .then(data => {
            // console.log(data);

            // addData(data);
            // del();

            // console.log(pencil);
            // getPencil();
            // getStar();
            // btnDel();




            addData(data);

        })
        .catch(function(error) {
            console.log('request failed', error);

        }).then(function(errorData) {
            console.log(errorData) //失敗
        });
}


// render 畫面更新
function addData(obj) {
    let Arrdata = [];
    // let v1;
    if (obj.keyCode !== 13 && obj.type == 'keydown') {
        return;
    };

    // 撈出輸入鍵的值
    let text = document.querySelector('.task-title').value;
    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').textContent;
    // console.log(date);
    // 因為要把輸入的值變成 陣列 所以製作一個空物件 
    let todo = {
        title: text,
        date: date,
        time: time,
        filte: files,
        comment: textarea,
        star: true,
        id: this.id,
        isCompleted: true

    };
    Arrdata.push(todo);
    // console.log(todoAry);

    render(Arrdata);


}
/**點選選單 出現效果 */
function menuClick() {
    for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener('click', function(e) {
            paelDisplay(this);
            taskShow(this.id);
        })
    }


}


function taskShow(tabName) {
    if (tabName == 'inProgress') {

        console.log('1');
    } else if (tabName == 'completed') {
        let otaskblock = document.querySelector('.taskblock')[2];
        let oDiv = document.createElement(`div`);
        oDiv.className = "task";

        otaskblock.appendChild(oDiv);



        let tasks = otaskblock.querySelectorAll('.task');
        console.log(tasks);
        // let result = [];
        // result = Array.from(task).map(el => {
        //     return el.classList.contains("is-done");
        // })
        // console.log(result);
        // render(result);
        // function isCompleted(){
        //     if (task.className =='task is-done'){

        //     }
        // }
    } else {
        console.log('3');

    }
}

function paelDisplay(active) {
    let taskContents = document.querySelectorAll(".taskblock");
    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i] == active) {
            menuItem[i].classList.add("slelected");
            taskContents[i].style.display = "block";
        } else {
            menuItem[i].classList.remove("slelected");
            taskContents[i].style.display = "none";
        }

    }

}