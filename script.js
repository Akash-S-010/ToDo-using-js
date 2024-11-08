let inputBox = document.querySelector("#inputBox")
let addBtn = document.querySelector("#addBtn")
let ul = document.querySelector("#ul")
let inpValueArr = []

// --------Local Storage------------
function setLocalStorage(){
    localStorage.setItem("task", JSON.stringify(inpValueArr))
}

function getLocalStorage(){
    const storedTasks = JSON.parse(localStorage.getItem("task"))
    if (storedTasks) {
        inpValueArr = storedTasks
        builtTask()
    }
}

// Builds the task from the array
function builtTask(){
    ul.innerHTML = "" 
    inpValueArr.forEach((item) => {
        let li = document.createElement("li")
        li.innerHTML = item
        ul.appendChild(li)
        
        li.style.animation = "slideIn 0.3s ease-in-out"

        let deleteBtn = document.createElement('i')
        deleteBtn.classList.add("fa-solid", "fa-trash")
        li.appendChild(deleteBtn)

        let editBtn = document.createElement('i')
        editBtn.classList.add("fa-solid", "fa-pen-to-square")
        li.appendChild(editBtn)

        // Delete button when clicked 
        deleteBtn.addEventListener('click', () => {
            li.style.animation = "slideOut 0.5s ease-in-out"
            li.addEventListener("animationend", () => {
                li.remove()
                inpValueArr = inpValueArr.filter(task => task !== item) // Remove the task from array
                setLocalStorage() // Update localStorage after deletion
                console.log(inpValueArr)
            })
        })

        // Edit button when clicked 
        editBtn.addEventListener("click", () => {
            let editValue = prompt("Please change The Thought", item)
            if (editValue !== null && editValue.trim() !== "") {
                li.firstChild.nodeValue = editValue
                const currentIndex = inpValueArr.indexOf(item)
                if (currentIndex !== -1) {
                    inpValueArr[currentIndex] = editValue
                    setLocalStorage() // Update localStorage after edit
                }
                console.log(inpValueArr)
            }
        })
    })
}

// Main function to add task
const addTask = () => {
    let inputValue = inputBox.value.trim() 

    if (inputValue === "") {
        alert("Please enter a task")
    } else {
        inpValueArr.push(inputValue) // Add task to array
        setLocalStorage() // Save updated array to localStorage
        builtTask() // Refresh UI
        inputBox.value = ""  
        inputBox.focus() // Set focus back to the input field
    }
}

// Load tasks from local storage
getLocalStorage()

addBtn.addEventListener('click', addTask)

inputBox.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})
