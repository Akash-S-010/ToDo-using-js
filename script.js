let inputBox = document.querySelector("#inputBox")
let addBtn = document.querySelector("#addBtn")
let ul = document.querySelector("#ul")
let thoughtArray = []

addBtn.addEventListener("click", () => {
    let inputValue = inputBox.value
    if (inputValue == "") {
        alert("List Cannot be empty")
    } else {
        let li = document.createElement("li")
        li.innerHTML = inputValue
        ul.appendChild(li)

        thoughtArray.push(inputValue)
        console.log(thoughtArray)

        li.style.animation = "slideIn 0.3s ease-in-out"

        inputBox.value = ""  // Clear the input field
        inputBox.focus()     // Set focus back to the input field for easy typing

        let deleteBtn = document.createElement('i')
        deleteBtn.classList.add("fa-solid", "fa-trash")
        li.appendChild(deleteBtn)

        let editBtn = document.createElement('i')
        editBtn.classList.add("fa-solid", "fa-pen-to-square")
        li.appendChild(editBtn)

        // Add an event listener to the delete button
        deleteBtn.addEventListener('click', () => {
            li.style.animation = "slideOut 0.5s ease-in-out";
            li.addEventListener("animationend", () => {
                li.remove()
                thoughtArray = thoughtArray.filter(item => item !== inputValue);
                console.log(thoughtArray);
            })
        });
    }
})
