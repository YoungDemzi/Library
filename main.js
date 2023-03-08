const addNewBtn = document.querySelector(".add-book-btn");
const bookAppend = document.querySelector(".book-container");
const submitBtn = document.querySelector(".submit");
const inputs = document.querySelectorAll("input");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const bookForm = document.querySelector("form");

let myLibrary = [];
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.createBook = function () {
  let read;
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  if (this.isRead === "true") read = "Has been read";
  else read = "Not read yet";
  bookContainer.innerHTML = `
  <div class="title">"${this.title}"</div>
    <div class="book-content">
      <div class="book-text-content">
        <p class="author">Author: ${this.author}</p>
        <p class="pages">Pages: ${this.pages}</p>
      </div>
      <div class="book-buttons">
        <button class="has-been-written book-btn">${read}</button>
        <button class="remove-book book-btn">Remove</button>
      </div>
    </div>
    `;
  bookAppend.appendChild(bookContainer);
  const readBtn = bookContainer.querySelector(".has-been-written");
  readBtn.addEventListener("click", () => {
    switch (true) {
      case readBtn.style.backgroundColor == "green":
        readBtn.style.backgroundColor = "red";
        readBtn.textContent = "Not read yet";
        break;
      case readBtn.style.backgroundColor == "red":
        readBtn.style.backgroundColor = "green";
        readBtn.textContent = "Has been read";

        break;
    }
  });
  if (this.isRead === "true") readBtn.style.backgroundColor = "green";
  else readBtn.style.backgroundColor = "red";
  bookContainer.querySelector(".remove-book").addEventListener("click", () => {
    bookContainer.remove();
  });
  myLibrary.push(bookContainer);
};
Object.create(Book.prototype);
function showPopup() {
  popup.style.display = "block";
  overlay.style.display = "block";
}
function submit() {
  let title = "200";
  let author;
  let pages;
  let isRead;
  inputs.forEach((element) => {
    switch (true) {
      case element.placeholder == "Title":
        title = element.value;
        break;
      case element.placeholder == "Author":
        author = element.value;
        break;
      case element.placeholder == "Pages":
        pages = element.value;
        break;
      case element.type == "checkbox":
        isRead = element.value;
        break;
    }
  });
  console.log(isRead);
  const book1 = new Book(title, author, pages, isRead);
  book1.createBook();
  popup.style.display = "none";
  overlay.style.display = "none";
  addBookToLibrary();
}
function addBookToLibrary() {
  console.log(myLibrary);
}
addNewBtn.addEventListener("click", showPopup);
bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  bookForm.reset();
});
submitBtn.addEventListener("click", submit);
