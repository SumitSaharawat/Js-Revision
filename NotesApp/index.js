const addBtn = document.querySelector('#addBtn');
const mainDiv = document.querySelector('.btn');

const saveNotes = () => {
    const allNotes = document.querySelectorAll('.note');
    const data = [];

    allNotes.forEach((note) => {
        const titleText = note.querySelector('.title').value;
        const contentText = note.querySelector('.content').value;
        data.push({ title: titleText, content: contentText });
    });

    localStorage.setItem('myNotes', JSON.stringify(data));
};

const loadNotes = () => {
    const savedDataString = localStorage.getItem('myNotes');
    const savedData = JSON.parse(savedDataString) || [];

    savedData.forEach((noteData) => {
        createNote(noteData.title, noteData.content);
    });
};

const createNote = (defaultTitle = "", defaultContent = "") => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    
    const noteHtml = `
    <div class="icons">
        <i class="save-btn fas fa-save" style="color:red" title="Save"></i>
        <i class="delete-btn fas fa-trash" style="color:yellow" title="Delete"></i> 
    </div>
    <div class="title-div">
        <textarea class="title" placeholder="Write the title ...">${defaultTitle}</textarea>
    </div>
    <textarea class="content" placeholder="Note down your thoughts ...">${defaultContent}</textarea>
    `;

    noteDiv.innerHTML = noteHtml;
    mainDiv.appendChild(noteDiv);

    const deleteBtn = noteDiv.querySelector('.delete-btn');
    const saveBtn = noteDiv.querySelector('.save-btn');

    deleteBtn.addEventListener("click", () => {
        noteDiv.remove();
        saveNotes();
    });

    saveBtn.addEventListener("click", () => {
        saveNotes();
        saveBtn.style.color = "lightgreen";
        setTimeout(() => { saveBtn.style.color = "red"; }, 1000);
    });
};

addBtn.addEventListener("click", () => {
    createNote();
});

loadNotes();