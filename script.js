let inputBox = document.querySelector("#inputBox")
let addBtn = document.querySelector("#addBtn")
let ul = document.querySelector("#ul")
let valueArray = []
let inputValue = inputBox.value

function setLocalStorage(){
    localStorage.setItem("task",inputValue)
}

function getLocalStorage(){
   if( inputValue = localStorage.getItem("task")){
    builtTask()
   }
}

function builtTask(){
    let li = document.createElement("li")
        li.innerHTML = inputValue
        ul.appendChild(li)

        // created an array for store inputValues
        valueArray.push(inputValue)
        console.log(valueArray)

        li.style.animation = "slideIn 0.3s ease-in-out"


        inputBox.value = ""  
        inputBox.focus()     // Set focus back to the input field for easy typing


        let deleteBtn = document.createElement('i')
        deleteBtn.classList.add("fa-solid", "fa-trash")
        li.appendChild(deleteBtn)

        let editBtn = document.createElement('i')
        editBtn.classList.add("fa-solid", "fa-pen-to-square")
        li.appendChild(editBtn)


        // Add an event listener to the delete button
        deleteBtn.addEventListener('click', () => {
            li.style.animation = "slideOut 0.5s ease-in-out"
            li.addEventListener("animationend", () => {
                li.remove()
                // when removing a list it also removed from the array
                valueArray = valueArray.filter(item => item !== inputValue)
                console.log(valueArray);
            })
        })

        // Add an event listener to the edit button
        editBtn.addEventListener("click", () => {
            let editValue = prompt("Please change The Thought")
            if (editValue !== null && editValue.trim() !== "") { 
                li.firstChild.nodeValue = editValue
                // Updated the value also from the thought array
                const currentIndex = valueArray.indexOf(inputValue)
                if (currentIndex !== -1) {
                    valueArray[currentIndex] = editValue;
                }
                console.log(valueArray);
            }
        });
    }
const addTask = () => {
    inputValue = inputBox.value
    if(inputValue == ""){
        alert("please enter Task")
    }

    setLocalStorage()
    getLocalStorage()

        
        
    }

addBtn.addEventListener('click',addTask)

inputBox.addEventListener('keydown',(e) => {
    if(e.key === "Enter"){
        addTask()
    }
})

getLocalStorage()