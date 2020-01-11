// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){

}

// Add Book to List
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list')
  // Create tr element
  const row = document.createElement('tr')
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>
  `;

  list.appendChild(row)
}

// Show Alert
UI.prototype.showAlert = function(message, className){
  // Create div
  const div = document.createElement('div')
  // Add classes
  div.className = `alert ${className}`
  // Add Text
  div.appendChild(document.createTextNode(message))
  // Get parent
  const container = document.querySelector('.container')
  // Get form
  const form = document.querySelector('#book-form')
  // Insert alert
  container.insertBefore(div, form)
  // Timeout after 3sec
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000);
}

// Clear fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';

}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Event listeners

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', 
  function(e){
    e.preventDefault();

    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    
    // Instantiate book
    const book = new Book(title, author, isbn)

    // Instantiate UI
    const ui = new UI()

    // Validate
    if(title === '' || author === '' || isbn === ''){
      // Error alert
      ui.showAlert('Please fill in all fields', 'error')
    }else{
      // Add book to list
      ui.addBookToList(book);

      // Show sucess
      ui.showAlert('Book Added', 'sucess')

      // Clear fields
      ui.clearFields();
    }
  }
)

// Event listener for Delete book
document.getElementById('book-list').addEventListener('click', function(e){
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target)

  // Show message
  ui.showAlert('Book Removed', 'sucess')
})