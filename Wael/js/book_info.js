document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');
    
    if (bookId) {
        // Load book from localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const book = books.find(b => b.id === bookId);
        
        if (book) {
            document.title = book.name;
            document.getElementById('bookTitle').textContent = book.name;
            document.getElementById('bookImage').src = book.image;
            document.getElementById('bookImage').alt = book.name;
            
            const isAvailable = book.available !== false; // Default to true if not specified
            
            const bookMeta = document.getElementById('bookMeta');
            bookMeta.innerHTML = `
                <h1>${book.name}</h1>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <p><strong>Description:</strong> ${book.description}</p>
                <p class="${isAvailable ? 'available' : 'unavailable'}">${isAvailable ? 'Available' : 'Unavailable'}</p>
                <div class="auth-buttons">
                    <a href="#" class="borrow-button ${!isAvailable ? 'disabled' : ''}" 
                       data-book-id="${book.id}" 
                       ${!isAvailable ? 'style="pointer-events: none; opacity: 0.5;"' : ''}>
                       ${isAvailable ? 'Borrow Book' : 'Not Available'}
                    </a>
                </div>
            `;
            
            // Add event listener to borrow button if it's available
            if (isAvailable) {
                document.querySelector('.borrow-button').addEventListener('click', function(e) {
                    e.preventDefault();
                    const bookId = this.getAttribute('data-book-id');
                    borrowBook(bookId);
                });
            }
        }
    }
});

function borrowBook(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === bookId);
    
    if (book && book.available !== false) {
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        borrowedBooks.push({
            id: book.id,
            title: book.name,
            author: book.author,
            category: book.category,
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()
        });
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        
        // Update book availability
        book.available = false;
        localStorage.setItem('books', JSON.stringify(books));
        
        alert(`You've borrowed "${book.name}"`);
        window.location.href = '/html/borrowed_books.html';
    } else {
        alert('This book is not available for borrowing.');
    }
}