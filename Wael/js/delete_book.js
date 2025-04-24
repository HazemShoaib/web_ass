document.addEventListener('DOMContentLoaded', function() {
    // Load books into dropdown
    loadBooks();
    
    // When book selection changes, show details
    document.getElementById('bookSelect').addEventListener('change', function() {
        const bookId = this.value;
        if (bookId) {
            showBookDetails(bookId);
        } else {
            document.getElementById('bookDetails').style.display = 'none';
            document.getElementById('deleteButton').disabled = true;
        }
    });
    
    // Handle form submission
    document.getElementById('deleteBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const bookId = document.getElementById('bookSelect').value;
        deleteBook(bookId);
    });
});

// Load books into dropdown
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const select = document.getElementById('bookSelect');
    
    // Clear existing options (except the first placeholder)
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add books from localStorage
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = `${book.name} by ${book.author || 'Unknown'}`;
        select.appendChild(option);
    });
}

// Show book details when selected
function showBookDetails(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id == bookId);
    
    if (book) {
        document.getElementById('displayBookName').textContent = book.name;
        document.getElementById('displayAuthor').textContent = book.author || 'Unknown';
        document.getElementById('displayCategory').textContent = book.category || 'Not specified';
        document.getElementById('displayDescription').textContent = book.description || 'No description available';
        document.getElementById('bookDetails').style.display = 'block';
        document.getElementById('deleteButton').disabled = false;
    }
}

// Delete book from localStorage
function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const initialLength = books.length;
    
    books = books.filter(book => book.id != bookId);
    
    if (books.length < initialLength) {
        localStorage.setItem('books', JSON.stringify(books));
        alert('Book deleted successfully!');
        loadBooks(); // Refresh the dropdown
        document.getElementById('deleteBookForm').reset();
        document.getElementById('bookDetails').style.display = 'none';
    } else {
        alert('Book not found!');
    }
}