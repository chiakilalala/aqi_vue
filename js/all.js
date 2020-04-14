// https://fathomless-brushlands-42339.herokuapp.com/todo3

//宣吿
let menuItem = document.querySelectorAll('.m-menu-item');
let taskContents = document.querySelector(".task").querySelector(".task-content");
let taskDetail = document.querySelector('.task-detail');
let pencil = document.getElementsByClassName('fa-pencil-alt');
let task = document.getElementsByClassName('task');
let firstContent = document.querySelector('#js-content');
let deleteX = document.querySelector('.fas.fa-times');
let star = document.getElementsByClassName('fa-star');
let text = document.querySelector('.task-title');
let buttonSave = document.querySelector('.button-save');
let buttonCancel = document.getElementsByClassName('button-cancel');
let taskblock = document.querySelector('.taskblock');
let taskCheckbox = document.getElementsByClassName('task-checkbox');
let inProgress = document.getElementById('inProgress');

let Arrdata = [];

window.onload = function() {
    menuClick();
    todo();
    del();
    btnDel();
    tabCLick();
    // post();


}

function todo() {
    fetch("https://fathomless-brushlands-42339.herokuapp.com/todo3")
        .then(response => {
            return response.json() //解析成一個json 物件

        })
        .then(data => {
            xxxx(data)
            console.log(data);
            //addData(data);
            // getPencil();


        })
        .catch(error => console.log('error', error.message));


}
//Applications監聽
buttonSave.addEventListener('click', addData);
text.addEventListener('keydown', addData);

// render 畫面更新
function addData(obj) {
    // let v1;
    if (obj.keyCode !== 13 && obj.type == 'keydown') {
        return;
    };

    // 撈出輸入鍵的值
    let text = document.querySelector('.task-title').value;
    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').value;
    // console.log(date);
    let todo = {
        title: text,
        date: date,
        time: time,
        filte: files,
        comment: textarea,
        star: true,
        isCompleted: true

    };
    Arrdata.push(todo);
    // console.log(todoAry);

    // 因為要把輸入的值變成 陣列 所以製作一個空物件 
    updateList(Arrdata);


}

function xxxx(datas) {

    let oTaskblock = document.querySelector(`.taskblock`);

    datas.forEach(data => {
        let oDiv = document.createElement(`div`);
        oDiv.className = "task";
        oDiv.innerHTML = `
              <div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox">
                    <i class="fas fa-square"></i>
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
                                    <textarea placeholder="Type Your Blahblahblah in here..."> ${data.comment}</textarea>
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
        oTaskblock.appendChild(oDiv);
        getEdit();
        btnDel();
        checkbox();
        getStar();
    })


}

//更新資料
function updateList(data) {
    let len = data.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += `
               <div class ="task ${data[i].star}" id="${data[i].id}">      
                <div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox">
                    <i class="fas fa-square"></i>
                </label>
                    </div>
                    <div class="task-col task-col-title" >
                  
                        <input type="text" class="task-title" placeholder="" value ="${data[i].title}">
                        <div class="task-info">
                            <div class="task-col">
                                <i class="far fa-calendar-alt"></i>
                                <span>${data[i].date}</span>
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
                                    <input type="date">
                                    <input type="time">
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
                                    <textarea placeholder="Type Your Blahblahblah in here..."value="${data[i].comment}"></textarea>
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
                </div>
                `;
    }
    text.value = '';
    taskblock.innerHTML = str;
    getPencil();
    getStar();
    btnDel();
    checkbox();
}

//第一個輸入鍵
function tabCLick() {
    firstContent.addEventListener('click', function() {
        document.querySelector('.task.task-add').classList.toggle('is-open');
    })

}

//第二個刪除鍵
function del() {
    deleteX.addEventListener('click', function(e) {
        document.querySelector('.task.task-add').classList.remove('is-open');
    })
}
//紅色cancel 
function btnDel() {

    Array.from(buttonCancel).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.remove('is-open');
        });
    });

    // buttonCancel.addEventListener('click', function(e) {
    //     document.querySelector('.task.task-add').classList.remove('is-open');

    // })
}




function menuClick() {
    for (let i = 0; i < menuItem.length; i++) {
        menuItem[i].addEventListener('click', function(e) {
            paelDisplay(this)
        })
    }


}

function paelDisplay(active) {
    for (let i = 0; i < menuItem.length; i++) {
        if (menuItem[i] == active) {
            menuItem[i].classList.add("slelected");
            // taskContents[i].style.display = "block";
        } else {
            menuItem[i].classList.remove("slelected");
            // taskContents[i].style.display = "none";
        }

    }

}




// console.log(pencil);
// console.log(taskContents);


function isOpen(active) {
    for (let i = 0; i < task.length; i++) {
        if (task[i] == active) {
            task[i].classList.toggle("is-open");

        } else {
            task[i].classList.remove("is-open");

        }

    }
}


////post

function post() {
    var myHeaders = new Headers();
    var urlencoded = new URLSearchParams();
    // 撈出輸入鍵的值
    let text = document.querySelector('.task-title').value;
    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').textContent;


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: encodeURI(JSON.stringify({
            title: text,
            date: date,
            time: time,
            filte: files,
            comment: textarea,

            star: false,
            isCompleted: false
        })),
        redirect: 'follow'
    };

    fetch("https://fathomless-brushlands-42339.herokuapp.com/todo3", requestOptions)
        .then(response => {
            return response.json() //解析成一個json 物件

        })
        .then(data => {
            console.log(data);
            // addData(data);
            del();
            updateList(data);
            // console.log(pencil);
            getPencil();
            getStar();
            btnDel();


            inProgress.addEventListener('click', function(e) {

                if (inProgress.className == "slelected") {
                    console.log(task);


                }

            })

            // checkbox();
            // console.log(taskCheckbox);




        })
        .catch(error => console.log('error', error));
}

function getEdit() {
    Array.from(pencil).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-open');



        });
    });
}

function getStar() {
    Array.from(star).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-highlight');
        });

    });
}

function checkbox() {

    Array.from(taskCheckbox).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);

            if (e.target.className == `fas fa-square`) {
                return;
            }
            let inputText = this.parentNode.nextSibling.nextElementSibling.children[0];
            // console.dir(inputText);

            // inputText.className = "text-throng";
            if (inputText.className !== "task-title text-throng") {
                inputText.className = "task-title text-throng";
            } else {
                inputText.className = "task-title";
            }


        }, false)


    })


}



function ajax() {

}
//點擊Inprogress 只顯示有刪除線的list
console.log(task);