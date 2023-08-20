const btn = document.querySelector("#addBtn")
const main = document.querySelector("#main")
btn.addEventListener(
    "click",function() {
        addNote(item)
    }
)
const saveNotes = () => {
    const notes = document.querySelector(".desc").value;
    const titles=document.querySelector(".title").value;
    const categ=document.querySelector(".category").value;
    // console.log("notes value ",notes);
    // console.log("titles value ",titles);
    const note = {
        title:titles,
        desc:notes,
        category:categ
    }
    // console.log(note);
    const data =JSON.parse(localStorage.getItem("mynotes")) || [];
    data.push(note);
    console.log(data);
    localStorage.setItem("mynotes",JSON.stringify(data));
}



const addNote = (item) => {
    var {category,title,desc} = item;
    const note = document.createElement("div");
    note.classList.add("card") //We have made a div with classname "card"
    note.innerHTML = ` 
    <div class="icons">
        <input type="text" class="category" placeholder="Add catgory" id="category" value=${category}>
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i> 
    </div>
    <input type="text" value=${title} class="title" placeholder="Add title">
    <textarea placeholder="Description" class="desc">${desc}</textarea>
    <div class="entry">
        <input type="date"></input>
    </div>
    `; //HTML to be implemented inside "card" class

    note.querySelector(".trash").addEventListener(
        "click",function() {
            note.remove() //When we click on trash icon,that particular note is removed.s
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",function() {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",function() { //jab user kuch likhke textarea se htgya,toh use save pr lick krne ki zroorat nhi padegi,apne-aap hi save ho jayega.
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}


//Anonymous Function for always showing cards even on refreshing the page.
(
    function() {
        const mynotes = JSON.parse(localStorage.getItem("mynotes"));
        if(mynotes !== null && mynotes.length !== 0){
            console.log(mynotes);
            mynotes.map((item)=>(
                addNote(item)
            ))
        }

    }
)()