
let todoList = document.querySelector('#todoData');
let todoRow = document.querySelector("#todoData > tr:nth-child(1)");
let todoTable = document.querySelector('#todoTable');
let toggle = document.querySelector('#completeToggle');
let userSelect = document.querySelector('#selectUser');
toggle.addEventListener('change', hidecompleted);
userSelect.addEventListener('change', showUser);


function showUser(){
 console.log(userSelect.value);
 let t  = todoTable;
 for (let r = 1; r < t.rows.length; r++) {
     // console.log(t.rows[r].cells[2].innerText);
     let value =  t.rows[r].cells[0].innerText;

 if(value == userSelect.value || userSelect.value == 0){
     t.rows[r].classList.remove("userhide");
 }
  else if (value !== userSelect.value){
     t.rows[r].className += ' userhide';
  }
 }
}

function hidecompleted(){
    let t  = todoTable;
    for (let r = 0; r < t.rows.length; r++) {
        // console.log(t.rows[r].cells[2].innerText);
        let value =  t.rows[r].cells[2].innerText;

    if(value == 'true' && toggle.checked == true ){
        t.rows[r].classList.remove("hide");
    }
     else if (value == 'true' && toggle.checked == false){
        t.rows[r].className += ' hide';
     }
    }

}

console.log('row');
console.log(todoRow);

// userSelect.addEventListener('change', () => {
//     console.log(userSelect.value);
// });

const getTodos = async () => {
 let dataRequest = await fetch('https://jsonplaceholder.typicode.com/todos/');
 if(dataRequest.status !== 200){
     throw new Error('data request failed');
 }
let data = await dataRequest.json();
return data;
}

getTodos()
    .then((data) => {
        let html = ``;
        let userArr = [];
        let userHtml = ``


        data.forEach(element => {
            if(userArr.indexOf(element['userId']) === -1){
                userHtml += `
                <option value="${element['userId']}">${element['userId']}</option>
                `
                console.log(element['userId']);
                userArr.push(element['userId']);
            }


            if(element['completed']){
                html += `
                <tr class="table-success hide">
                <th scope="row">${element['userId']}</th>
                <td>${element['title']}</td>
                <td>${element['completed']}</td>
                </tr>
            ` 
            } else {
            html += `
                <tr class="table">
                <th scope="row">${element['userId']}</th>
                <td>${element['title']}</td>
                <td>${element['completed']}</td>
                </tr>
            `}
            // console.log(element['title']);
        });
        todoList.innerHTML = html;
        userSelect.innerHTML += userHtml;
        // let userArr = [];
        // let userHtml = ``;
        // userArr.forEach(e => {
        //     if(userArr.indexOf(element['userId']) === -1){
        //         userArr.push(element['userId']);
        //     }
        // })
        
    })
    .catch(error => console.log(error));
    console.log(typeof todos);

// todos.forEach(element => {
//     console.log(element);
// });
