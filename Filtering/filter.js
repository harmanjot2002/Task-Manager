const btns=[
    {
        id: 1,
        name: "Work"
    },
    {
        id: 2,
        name: "Personal"
    },
    {
        id: 3,
        name: "Study"
    },
    {
        id: 4,
        name: "Health"
    },
    {
        id: 5,
        name: "Shopping"
    },
    {
        id:9,
        name:"All"
    }
]
    
const filters = [...new Set(btns.map((btn)=>
    {return btn}))]
    
document.getElementById('btns').innerHTML=filters.map((btn)=>{
    var {name,id} = btn;
    return(
        "<button class='filter-btns' onclick='filterItems("+(id)+`)'>${name}</button>`
    )
}).join('');
    
const mynotes = JSON.parse(localStorage.getItem("mynotes"));
// console.log(mynotes);
const filterItems = (a)=>{
    const flterCategories = mynotes.filter(item);
    function item(value){
        if(value.ref==a){
            return(
                value.ref
            )
        }
        else if(a==9){
            return (
                value.same
            )
        }
    }
    displayItem(flterCategories)
}
 
    
const displayItem = (items) => {
    document.getElementById('main').innerHTML = items.map((item)=>{
        var {category,title,desc,ind,date,time,ischeck} = item;
        const data = JSON.parse(localStorage.getItem("mynotes")) || [];
        let num = "";
        if(ind !== undefined) num = ind;
        else num = data.length;
        // console.log("value of num is ",num);
        const str = "";
        return(
            `
            <div class="card">
                <div class="icons">
                    <input onchange="handleCheckBox(event,${num})" type="checkbox" class=" ${"complete"+num} complete" id="ci" ${ischeck && "checked"} >
                    <input style="${ischeck ? "text-decoration:line-through 3px var(--main-bg)" : "text-decoration:none" }" type="text" autocomplete="off" class="${"category"+num} category" placeholder="Add category" id="category" value=${category ? category : str}>
                    <i onclick="saveNotes(${num},${num},${num},${num},${num})" class="save fas fa-save"></i>
                    <i onclick="deleteNotes(${num})" class="trash fas fa-trash"></i> 
                </div>
                <input id="title" autocomplete="off" type="text" class=${"title"+num} placeholder="Add title" value=${title ? title : str}>
                <textarea id="desc" value=${desc} class=${"desc"+num} placeholder="Description">${desc ? desc : ""}</textarea>
                <div class="entry">
                    <input type="date" class="${"date"+num} date" value=${date}></input>
                    <input type="time" class="${"time"+num} time" value=${time}></input>
                </div>
            </div>
            `
        )
    }).join('');
}