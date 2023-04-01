function modalViewUserAdd (obj){
    let buttonAddTable = obj.querySelector('#btn')

    buttonAddTable.addEventListener('click', ()=>{
        let add = ''
        let inputAdd = obj.querySelectorAll('.inputAdd')
        for (let i = 0; i < inputAdd.length; i++){
            if(inputAdd[i].value === ''){
                add = 'no'
                return alert('Не все поля заполненны')
            }
            add = 'yes'
        }
        if (add === 'yes'){
            let inputId = obj.querySelector('#inputId')
            let inputFirstName = obj.querySelector('#inputFirstName')
            let inputLastName = obj.querySelector('#inputLastName')
            let inputEmail = obj.querySelector('#inputEmail')
            let inputPhone = obj.querySelector('#inputPhone')
            let user = {}
            user['id'] = Number(inputId.value)
            user['firstName'] = inputFirstName.value
            user['lastName'] = inputLastName.value
            user['email'] = inputEmail.value
            user['phone'] = inputPhone.value
            tableInfo.allUsers.unshift(user)

            inputId.value = ''
            inputFirstName.value = ''
            inputLastName.value = ''
            inputEmail.value = ''
            inputPhone.value = ''

            obj.style.display = 'none'
            tableInfo.users50 = tableInfo.allUsers.slice(min,max)
            view(document.getElementById("table"))
        }
    })
}

function modalViewAboutUser(table, aboutUsers){
    for (let i = 0; i < tableInfo.users50.length; i++) {
        let tr = table.querySelectorAll('.user')
        tr[i].addEventListener('click', ()=>{

            aboutUsers.style.display = 'block'

            let aboutUser = document.createElement('div')
            aboutUser.id = 'modalUser'
            aboutUser.className = 'about'
            aboutUser.textContent = 'About user\r\n'
            aboutUser.textContent += `Id: ${tableInfo.users50[i].id}\r\n`
            aboutUser.textContent += `First name: ${tableInfo.users50[i].firstName}\r\n`
            aboutUser.textContent += `Last name: ${tableInfo.users50[i].lastName}\r\n`
            aboutUser.textContent += `Email: ${tableInfo.users50[i].email}\r\n`
            aboutUser.textContent += `Phone: ${tableInfo.users50[i].phone}\r\n`
            aboutUser.textContent += 'Address:\r\n'
            aboutUser.textContent += `  Street: ${tableInfo.users50[i].address.streetAddress}\r\n`
            aboutUser.textContent += `  City: ${tableInfo.users50[i].address.city}\r\n`
            aboutUser.textContent += `  State: ${tableInfo.users50[i].address.state}\r\n`
            aboutUser.textContent += `  Zip: ${tableInfo.users50[i].address.zip}\r\n`
            aboutUser.textContent += `Description: ${tableInfo.users50[i].description}\r\n`
            aboutUsers.append(aboutUser)

            let btnCloseUser = aboutUsers.querySelector('#btnUserClose')
            btnCloseUser.onclick = function (){
                aboutUsers.style.display = 'none'
                aboutUser.remove()
            }
        })
    }
}