let midPiece = new Book("One Piece", "Eichiro Oda", 22449, "Ongoing")
const myLibrary = [midPiece]
const bookButton = document.querySelector(".addBookButton");
const updateButton = document.querySelector('.updateButton')


function ping() {
    console.log('pong')
}


updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateBooks();
    renderBooks();
})
bookButton.addEventListener("click", (e) => {
    e.preventDefault();
    form = document.querySelector('.newBookForm')
    form.reportValidity();
    if (form.checkValidity()) {
        bookSubmit();
    };
})

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function() {
        return `${title} by ${author}, ${pages}, ${status}`
    }
}

function addBookToLibrary(title, author, pages, status) {
    book = new Book(title, author, pages, status)
    myLibrary.push(book)
    renderBooks();
}

function bookSubmit() {
    title = document.querySelector("#newTitleInput").value;
    author = document.querySelector('#newAuthorInput').value;
    pages = document.querySelector('#newPagesInput').value;
    //status is a keyword or something so im using current
    current = document.querySelector('#newStatusInput').value;

    addBookToLibrary(title, author, pages, current);
}

function deleteChildren(node) {
    while (node.firstChild) {
        node.firstChild.remove();
    }
}
function renderBooks() {
    table = document.querySelector(".booksTable>tbody")
    deleteChildren(table);
    for (let book in myLibrary) {
        row = document.createElement('tr')
        table.appendChild(row)
        for (let key in myLibrary[book]) {
            if (key == "info") {
                continue;
            }
            if (key == "status") {
                cell = document.createElement('td')
                select = createStatusSelect(myLibrary[book].status);
                cell.appendChild(select);
                select.id = myLibrary[book].title.charAt(0) + myLibrary.indexOf(book) + "Select"
                row.appendChild(cell);
                continue;
            }
            cell = document.createElement('td')
            cell.innerText = myLibrary[book][key]
            row.appendChild(cell);
        }
    }
    function createStatusSelect(selection) {
        select = document.createElement('select')
        options = ["Not Started", "Finished", "Reading", "Ongoing", "Haitus"]
        for (let item in options ) {
            option = document.createElement('option')
            option.value = options[item]
            option.innerText = options[item];
            select.appendChild(option);
        }
        select.class = "tableSelect"
        select.value = selection.toString();
        return select
    }
}

function updateBooks() {
    for (let book in myLibrary) {
        bookid = '#' + myLibrary[book].title.charAt(0) + myLibrary.indexOf(book) + "Select"
        myLibrary[book].status = document.querySelector(bookid).value
        console.log(document.querySelector(bookid))
        console.log(bookid)
    }
}
renderBooks();
