let tableInfo = {
    table: [{
        id: '&#9660;',
        firstName: '&#9660;',
        lastName: '&#9660;',
        email: '&#9660;',
        phone: '&#9660;',
    }],
    allUsers: [],
    users50: [],
    finder : '',
}


fetch('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',{
    method: 'GET'
}).then(getInfo)

function getInfo (users){
    users.json().then(processJsonUsers)
}

let min = 0
let max = 50
function processJsonUsers (usersInfo){
    tableInfo.allUsers = usersInfo.slice(0)

    tableInfo.users50 = tableInfo.allUsers.slice(min,max)

    console.log(tableInfo)
    view(document.getElementById("table"))
    buttons(document.getElementById('buttons'),document.getElementById('finder'), document.getElementById('buttonAdd'),document.getElementById('myModal'))
}

function view (table){
    table.querySelector('#tbody').innerHTML = ''
    table.querySelector('#thead').innerHTML = ''
    document.getElementById('load').style.display = 'none'

    for(let i = 0; i < tableInfo.table.length; i++){
        let thId = document.createElement('th')
        thId.innerHTML = 'Id ' + tableInfo.table[i].id
        thId.id = 'id'
        sort(thId, 'id')
        table.querySelector('#thead').append(thId)

        let thFirstName = document.createElement('th')
        thFirstName.innerHTML = 'FirstName ' + tableInfo.table[i].firstName
        sort(thFirstName, 'firstName')
        table.querySelector('#thead').append(thFirstName)

        let thLastName = document.createElement('th')
        thLastName.innerHTML = 'LastName ' + tableInfo.table[i].lastName
        sort(thLastName, 'lastName')
        table.querySelector('#thead').append(thLastName)

        let thEmail = document.createElement('th')
        thEmail.innerHTML = 'Email ' + tableInfo.table[i].email
        sort(thEmail, 'email')
        table.querySelector('#thead').append(thEmail)

        let thPhone = document.createElement('th')
        thPhone.innerHTML = 'Phone ' + tableInfo.table[i].phone
        sort(thPhone, 'phone')
        table.querySelector('#thead').append(thPhone)
    }

    for (let i = 0; i < tableInfo.users50.length; i++) {
        let tr = document.createElement('tr')
        tr.id = `${[i]}`
        tr.className = 'user'
        table.querySelector('#tbody').append(tr)

        let tdId = document.createElement('td')
        tdId.textContent = tableInfo.users50[i].id
        tdId.className = 'id'
        tr.appendChild(tdId)

        let tdFirstName = document.createElement('td')
        tdFirstName.textContent = tableInfo.users50[i].firstName
        tr.appendChild(tdFirstName)

        let tdLastName = document.createElement('td')
        tdLastName.textContent = tableInfo.users50[i].lastName
        tr.appendChild(tdLastName)

        let tdEmail = document.createElement('td')
        tdEmail.textContent = tableInfo.users50[i].email
        tr.appendChild(tdEmail)

        let tdPhone = document.createElement('td')
        tdPhone.textContent = tableInfo.users50[i].phone
        tr.appendChild(tdPhone)
    }
    modalViewAboutUser(document.getElementById("table"), document.getElementById('aboutUsers'))
}

function sort (subject, item){
    subject.addEventListener('click', ()=>{
        if(tableInfo.table[0][item] === '&#9660;'){
            tableInfo.table[0][item] = '&#9650;'
            tableInfo.allUsers.sort(function (a, b){
                if(a[item] > b[item]) return 1
                if(a[item] === b[item]) return 0
                if(a[item] < b[item]) return -1
            })
        } else {
            tableInfo.table[0][item] = '&#9660;'
            tableInfo.allUsers.sort(function (a, b){
                if(a[item] > b[item]) return -1
                if(a[item] === b[item]) return 0
                if(a[item] < b[item]) return 1
            })
        }
        tableInfo.users50 = tableInfo.allUsers.slice(min,max)
        view(document.getElementById("table"))
        console.log(tableInfo)
    })
}

function buttonsClick (button, number){
    button.addEventListener('click', ()=>{
        min += number
        if (min < 0) {
            min = 0
        }
        max += number
        if (max > tableInfo.allUsers.length){
            min = tableInfo.allUsers.length - number
            max = tableInfo.allUsers.length
        }
        if (max === 0 ){
            max = 50
        }
        tableInfo.users50 = tableInfo.allUsers.slice(min,max)
        view(document.getElementById("table"))
    })
}


function finderUser (finder){
    let find = finder.querySelector('#find')
    let btnClose = finder.querySelector('#close')
    tableInfo.finder = find.value
    if(tableInfo.finder !== ''){
        btnClose.style.display = 'block'
        tableInfo.users50.splice(0)
        console.log(tableInfo)
        for (let i = 0; i < tableInfo.allUsers.length; i++){
            if(String(tableInfo.allUsers[i].id).includes(find.value)){
                tableInfo.users50.push(tableInfo.allUsers[i])
            }
            // if(tableInfo.allUsers[i].id.includes(Number(find.value))){
            //     tableInfo.users50.push(tableInfo.allUsers[i])
            // }
            if(tableInfo.allUsers[i].firstName.includes(find.value)){
                tableInfo.users50.push(tableInfo.allUsers[i])
            }
            if(tableInfo.allUsers[i].lastName.includes(find.value)){
                tableInfo.users50.push(tableInfo.allUsers[i])
            }
            if(tableInfo.allUsers[i].email.includes(find.value)){
                tableInfo.users50.push(tableInfo.allUsers[i])
            }
            if(tableInfo.allUsers[i].phone.includes(find.value)){
                tableInfo.users50.push(tableInfo.allUsers[i])
            }
        }
        view(document.getElementById("table"))
        find.value = ''
    } else {
        btnClose.style.display = 'none'
    }
    btnClose.addEventListener('click', ()=>{
        btnClose.style.display = 'none'
        tableInfo.users50 = tableInfo.allUsers.slice(min,max)
        view(document.getElementById("table"))
    })

}

function buttons (buttonsTable, finder, add, modalAdd){
    finder.style.display = 'flex'
    add.style.display = 'block'
    buttonsTable.style.display = 'flex'
    let buttonPrevious = buttonsTable.querySelector('#previous')
    buttonsClick(buttonPrevious, -50)
    let buttonNext = buttonsTable.querySelector('#next')
    buttonsClick(buttonNext, 50)

    let buttonFinder = finder.querySelector('#buttonFind')
    buttonFinder.addEventListener('click', ()=>{
        finderUser(finder)
    })
    let buttonAdd = add.querySelector('#add')
    buttonAdd.onclick = function (){
        modalAdd.style.display = 'block'
    }
    let span = modalAdd.querySelector('#btnClose')
    span.onclick = function (){
        modalAdd.style.display = 'none'
    }
    modalViewUserAdd(modalAdd)
}