
let todoList = document.querySelector('#todoData');
let userSelect = document.querySelector('#selectUser');
let todoRow = document.querySelector("#todoData > tr:nth-child(1)");
let todoTable = document.querySelector('#todoTable');
let toggle = document.querySelector('#completeToggle');

toggle.addEventListener('change', hidecompleted);




function hidecompleted(){
    let t  = todoTable;
    for (let r = 0; r < t.rows.length; r++) {
        // console.log(t.rows[r].cells[2].innerText);
        let value =  t.rows[r].cells[2].innerText;

    if(value == 'true' && toggle.checked == false ){
        t.rows[r].classList.remove("hide");
    }
     else if (value == 'true' && toggle.checked == true){
        t.rows[r].className += ' hide';

     }
        // console.log(status.innerHTML);
    }

}

console.log('row');
console.log(todoRow);

userSelect.addEventListener('change', () => {
    console.log(userSelect.value);
});

const getTodos = async () => {
 let dataRequest = await fetch('https://jsonplaceholder.typicode.com/todos');
 if(dataRequest.status !== 200){
     throw new Error('data request failed');
 }
let data = await dataRequest.json();
return data;
}

getTodos()
    .then((data) => {
        let html = ``;
        data.forEach(element => {
            if(element['completed']){
                html += `
                <tr class="table-success">
                <th scope="row">${element['userId']}</th>
                <td>${element['title']}</td>
                <td>${element['completed']}</td>
                </tr>
            ` 
            } else {
            html += `
                <tr class="table-warning">
                <th scope="row">${element['userId']}</th>
                <td>${element['title']}</td>
                <td>${element['completed']}</td>
                </tr>
            `}
            // console.log(element['title']);
        });
        todoList.innerHTML = html;
        
    })
    .catch(error => console.log(error));
    console.log(typeof todos);

// todos.forEach(element => {
//     console.log(element);
// });
