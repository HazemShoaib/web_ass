document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const bookData = {
        id: document.getElementById('bookID').value,
        name: document.getElementById('bookName').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };
    
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(bookData);
    localStorage.setItem('books', JSON.stringify(books));
    
    alert('Book added successfully!');
    this.reset();
});