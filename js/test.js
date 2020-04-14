let AllBtn = document.querySelector(`.task-form-submit`).children;
//宣告
let menuItem = document.querySelectorAll('.m-menu-item');
let _buttonSave = document.querySelector('.button-save');
// let tabCLick = document.querySelector(`.task-col-title .task-titles`);



let Allurl = `http://localhost:3000/todos`;

// let oDetail = document.querySelector(`.detail`);
let Afiles = document.getElementById(`files`);

window.onload = function() {
    // console.log(data);
    menuClick();
    todo(); //get method
    tabCLick();
    del();
    btnDel();
}


function render(datas) {
    let totalTak = document.querySelector('.total-task');
    let Taskblock = document.querySelector('.taskblock');
    // if (datas.constructor.name != "Array") {

    //     datas = [datas];
    //     console.log(typeof(datas))
    // }
    datas.forEach((data) => {

        let oDiv = document.createElement(`div`);

        oDiv.className = "task";
        oDiv.id = `${data.id}`;
        oDiv.innerHTML =
            `<div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox" id="okbox" name="checkbox" >
                    <i class="fas fa-square" ></i>
                </label>
                    </div>
                    <div class="task-col task-col-title" >
                        <input type="text" class="task-title" placeholder="feed my rabbit." value="${data.message}" >
                        <div class="task-info">
                            <div class="task-col">
                                <i class="far fa-calendar-alt"></i>
                                <span>${data.startDate}</span>
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
                                    <input type="date" value="${data.startDate}">
                                    <input type="time" value="${data.timestamp}">
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
        Taskblock.appendChild(oDiv);

    })

    // console.log(datas.length);
    let sum = datas.length;
    totalTak.innerHTML = `${sum} task left`;
    getEdit();
    btnDel();
    checkbox();
    getStar();
}

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
                return response.json(); //解析成一個JSON
            } else {
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }


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
            return error.response.json();
        }).then(function(errorData) {
            console.log(errorData)
                // errorData 裡面才是實際的 JSON 資料
        });
}


//第一個輸入鍵
function tabCLick() {
    let firstContent = document.querySelector('#js-content');
    firstContent.addEventListener('click', function() {
        document.querySelector('.task.task-add').classList.toggle('is-open');
    })

}

//第一個 刪除鍵
function del() {
    let deleteX = document.querySelector('.fas.fa-times');
    deleteX.addEventListener('click', function(e) {
        document.querySelector('.task.task-add').classList.remove('is-open');
    })
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
            alert("123");
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-open');
        });
    });
}