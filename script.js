const btn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
const searchInputField = document.querySelector('#search');
// const completed=document.querySelector('#list-container');

function search(e){
    const query = document.getElementById("searchInput").value;
    // console.log(query);
    const mynotes = JSON.parse(localStorage.getItem("mynotes")) || [];
    // console.log(mynotes);
    const searchedItems = mynotes.filter((item)=>(
        item.title.toLowerCase().includes(query)
    ))
    // console.log(searchedItems);
    displayItem(searchedItems);
}

btn.addEventListener(
    "click",function() {
        addNote()
    }
)

const sortDate = () => {
    const date_cat = document.querySelector("#date_cat").value;
    console.log(date_cat);
    const mynotes = JSON.parse(localStorage.getItem("mynotes")) || [];
    // const tbody = document.querySelector("tbody");
    // tbody.innerHTML = "";
    let newData;
    if (date_cat === "0") {
        window.location.reload();
        return;
    }
    if (date_cat === "asc") {
        newData = mynotes.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }
    if (date_cat === "desc") {
        newData = mynotes.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    }
    document.getElementById('main').innerHTML = newData.map((item)=>{
        var {category,title,desc,ind,date} = item;
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
                    <input type="text" autocomplete="off" class="${"category"+num} category" placeholder="Add catgory" id="category" value=${category ? category : str}>
                    <i onclick="saveNotes(${num},${num},${num},${num})" class="save fas fa-save"></i>
                    <i onclick="deleteNotes(${num})" class="trash fas fa-trash"></i> 
                </div>
                <input id="title" autocomplete="off" type="text" class=${"title"+num} placeholder="Add title" value=${title ? title : str}>
                <textarea id="desc" value=${desc} class=${"desc"+num} placeholder="Description">${desc ? desc : ""}</textarea>
                <div class="entry">
                    <input type="date" class="${"date"+num} date" value=${date}></input>
                </div>
            </div>
            `
        )
    }).join('');
}

const saveNotes = (c,t,d,dt) => {
    // console.log("save notes index ki value ",c , " t " , t , " d " , d);
    const notes = document.querySelector(".desc"+d).value;
    const titles=document.querySelector(".title"+t).value;
    const categ=document.querySelector(".category"+c).value;
    const date = document.querySelector(".date"+dt).value;
    if (categ === "" || titles === "") {
        alert("Please fill all the fields");
        return;
    }
    if (date === "") {
        alert("Please select a Due date");
        return;
    }
    // console.log("notes value ",notes);
    // console.log("titles value ",titles);
    var value;
    if(categ==="Work"){
        value=1;
    }
    else if(categ==="Personal"){
        value=2;
    }
    else if(categ==="Study"){
        value=3;
    }
    else if(categ==="Health"){
        value=4;
    }
    else if(categ==="Shopping"){
        value=5;
    }
    const note = {
        isChecked:false,
        id:c,
        title:titles,
        desc:notes,
        category:categ,
        ref:value,
        same:"9",
        date:date
    }
    // console.log(note);
    const data =JSON.parse(localStorage.getItem("mynotes")) || [];
    data.push(note);
    // console.log(data);
    localStorage.setItem("mynotes",JSON.stringify(data));
}

const handleCheckBox = (e,ind)=>{
    const checked = e.target.checked;
    const p = (e.target.parentElement);
    const nodes = p.querySelectorAll("input")[1];
    const data = JSON.parse(localStorage.getItem("mynotes")) || [];
    const findIndex = data.findIndex((item)=>item.id === ind);
    console.log(findIndex);
    if(checked){
        nodes.style.textDecoration = "line-through 3px var(--main-bg)";
        data[findIndex] = {
            ...data[findIndex],
            isChecked:true
        }
    }
    else{
        nodes.style.textDecoration = "none";
        data[findIndex] = {
            ...data[findIndex],
            isChecked:false
        }
    }
    localStorage.setItem("mynotes",JSON.stringify(data));
}

const addNote = (category,title,desc,ind,date,ischeck) => {
    // console.log("inde xhai ye " ,ischeck);
    const note = document.createElement("div");
    note.classList.add("card") //We have made a div with classname "card"
    const data = JSON.parse(localStorage.getItem("mynotes")) || [];
    let num = "";
    if(ind !== undefined) num = ind;
    else num = data.length;
    // console.log("value of num is ",num);
    const str = "";
    note.innerHTML = ` 
    <div class="icons">
        <input onchange="handleCheckBox(event,${num})" type="checkbox" class=" ${"complete"+num} complete" id="ci" ${ischeck && "checked"} >
       <input type="text" autocomplete="off" class="${"category"+num} category" placeholder="Add category" id="category" value=${category ? category : str}>
        <i onclick="saveNotes(${num},${num},${num},${num})" class="save fas fa-save"></i>
        <i onclick="deleteNotes(${num})" class="trash fas fa-trash"></i> 
    </div>
    <input id="title" autocomplete="off" type="text" class=${"title"+num} placeholder="Add title" value=${title ? title : str}>
    <textarea id="desc" value=${desc} class=${"desc"+num} placeholder="Description">${desc ? desc : ""}</textarea>
    <div class="entry">
        <input type="date" class="${"date"+num} date" value=${date}></input>
    </div>
    `; //HTML to be implemented inside "card" class
    main.appendChild(note);
}

const deleteNotes = (num)=>{
    // console.log("delete note value ",num);
    const data = JSON.parse(localStorage.getItem("mynotes"));
    const filteredItems = data.filter((item)=>item.id !== num); //removes card with specific id
    // console.log("Filtered items ",filteredItems);
    localStorage.setItem("mynotes",JSON.stringify(filteredItems));
    window.location.reload();
}

//Anonymous Function for always showing cards even on refreshing the page.
(
    function() {
        const mynotes = JSON.parse(localStorage.getItem("mynotes"));
        if(mynotes !== null && mynotes.length !== 0){
            console.log(mynotes);
            mynotes.map((item)=>(
                addNote(item.category,item.title,item.desc,item.id,item.date,item.isChecked)
            ))
        }
    }
)()