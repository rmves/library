let myLibrary = []

class Book {
    constructor(title,author,pages,isRead,number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead
        this.number = myLibrary.length
    }
};

const addBookBtn = document.getElementById('add-book-btn')
const addBookModal = document.getElementById('add-book-modal')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('add-book-form')
const bookGrid = document.getElementById('book-grid')

const addBookToLibrary = (book) => {
    myLibrary.push(book)
}

const openBookModal = () => {
    addBookForm.reset()
    addBookModal.classList.add('active')
    overlay.classList.add('active')
}

const closeBookModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
}

const createBookGrid = () => {
    resetBookGrid()
    for (let book of myLibrary) {
        createBook(book)
    }
};

const createBook = (book) => {
    const card = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const btnGroup = document.createElement('div')
    const removeBookBtn = document.createElement('button')
    const isReadBtn = document.createElement('button')

    card.classList.add('book-card')
    card.dataset.booknum = book.number
    btnGroup.classList.add('button-group')
    removeBookBtn.classList.add('btn')
    removeBookBtn.onclick = removeBook
    isReadBtn.onclick = toggleIsRead

    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} Pages`
    removeBookBtn.textContent = 'Remove'

    if (book.isRead) {
        isReadBtn.classList.add('btn-light-green')
        isReadBtn.textContent = 'Read'
    } else {
        isReadBtn.classList.add('btn-light-red')
        isReadBtn.textContent = 'Not Read'
    }

    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    btnGroup.appendChild(removeBookBtn)
    btnGroup.appendChild(isReadBtn)
    card.appendChild(btnGroup)
    bookGrid.appendChild(card)
}

const getBookInputs = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('is-read').checked
    return new Book(title,author,pages,isRead)
}

const resetBookGrid = () => {
    bookGrid.innerHTML = '';
}

const addBookToPage = (e) => {
    e.preventDefault()
    const newBook = getBookInputs()
    addBookToLibrary(newBook)
    createBookGrid()
    closeBookModal()
}

const setBookNumber = () => {
    myLibrary.map(obj => {
        obj.number = myLibrary.indexOf(obj)
    })
    }

const removeBook = (e) => {
    const bookNum = e.target.parentNode.parentNode.dataset.booknum
    myLibrary.splice(bookNum,1)
    setBookNumber()
    createBookGrid()
    }

const toggleIsRead = (e) => {
    const status = e.target.parentNode.lastChild
    if (status.innerHTML == 'Read') {
        status.classList.remove('btn-light-green')
        status.classList.add('btn-light-red')
        status.innerHTML = 'Not Read'
    } else {
        status.classList.remove('btn-light-red')
        status.classList.add('btn-light-green')
       status.innerHTML = 'Read'}
    console.log(status)
}


addBookBtn.onclick = openBookModal
overlay.onclick = closeBookModal
addBookForm.onsubmit = addBookToPage