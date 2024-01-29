const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function createNote() {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.addEventListener("blur", handleNoteBlur); // Handle blur event
    img.src = "delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    inputBox.focus();
    updateStorage();
}

function deleteNote(target) {
    target.parentElement.remove();
    updateStorage();
}

function handleNoteBlur(event) {
    const editedNote = event.target;
    editedNote.removeAttribute("contenteditable");
    updateStorage();
}

createBtn.addEventListener("click", createNote);

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        deleteNote(e.target);
    }
});

notesContainer.addEventListener("input", function (e) {
    if (e.target.tagName === "P") {
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        const editableNote = document.querySelector(".input-box[contenteditable='true']");
        if (editableNote) {
            editableNote.blur();
        }
    }
});
