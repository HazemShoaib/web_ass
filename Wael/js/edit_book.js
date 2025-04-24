document.addEventListener('DOMContentLoaded', function() {
    const bookSelect = document.getElementById('bookSelect');
    const nameInput = document.getElementById('editBookName');
    const authorInput = document.getElementById('editAuthor');
    const categoryInput = document.getElementById('editCategory');
    const descInput = document.getElementById('editDescription');
    const imageInput = document.getElementById('editImage');
    
    let books = JSON.parse(localStorage.getItem('books')) || [];
    
    bookSelect.innerHTML = '<option value="">-- Select a Book --</option>';
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = `${book.name} by ${book.author}`;
        bookSelect.appendChild(option);
    });
    
    bookSelect.addEventListener('change', function() {
        const selectedBook = books.find(book => book.id === this.value);
        if (selectedBook) {
            nameInput.value = selectedBook.name;
            authorInput.value = selectedBook.author;
            categoryInput.value = selectedBook.category;
            descInput.value = selectedBook.description;
            imageInput.value = selectedBook.image || '';
        }
    });
    
    document.getElementById('editBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookId = bookSelect.value;
        const updatedBook = {
            id: bookId,
            name: nameInput.value,
            author: authorInput.value,
            category: categoryInput.value,
            description: descInput.value,
            image: imageInput.value
        };
        
        const index = books.findIndex(book => book.id === bookId);
        if (index !== -1) {
            books[index] = updatedBook;
            localStorage.setItem('books', JSON.stringify(books));
            alert('Book updated successfully!');
            window.location.href = '/html/admindash.html';
        }
    });
});