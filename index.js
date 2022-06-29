let myLeads = []
let oldLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

console.log(leadsFromLocalStorage)

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        listItems += "<li><a target='_blank' href='#'>" + leads[i] + "</a></li>"
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick",function(){
    console.log("Double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

deleteBtn.addEventListener("click",function(){
    console.log("Delete button clicked!")
    localStorage.clear()
    myLeads = []
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click",function(){
    console.log("Button clicked!")
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})
