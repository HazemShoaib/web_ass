document.addEventListener('DOMContentLoaded', function() {
    const bookList = document.getElementById('borrowedBooksList');
    
    // Get all books available in the website from localStorage
    const allBooks = JSON.parse(localStorage.getItem('books')) || [];
    
    // Get borrowed books from localStorage
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    
    // Filter out books that no longer exist in the website
    const existingBorrowedBooks = borrowedBooks.filter(borrowedBook => {
        // Check if book exists in allBooks or has been manually borrowed (without ID)
        return allBooks.some(book => book.id === borrowedBook.id) || 
               (!borrowedBook.id && borrowedBook.title); // Keep manually added books for backward compatibility
    });
    
    // Update localStorage if any books were removed
    if (existingBorrowedBooks.length !== borrowedBooks.length) {
        localStorage.setItem('borrowedBooks', JSON.stringify(existingBorrowedBooks));
        borrowedBooks = existingBorrowedBooks;
        
        // Show notification if books were automatically removed
        if (borrowedBooks.length < existingBorrowedBooks.length) {
            const removedCount = borrowedBooks.length - existingBorrowedBooks.length;
            alert(`${Math.abs(removedCount)} book(s) were automatically removed as they're no longer available in the library.`);
        }
    }
    
    bookList.innerHTML = '';
    
    if (borrowedBooks.length === 0) {
        bookList.innerHTML = '<li class="book-item">No books currently borrowed</li>';
        return;
    }
    
    borrowedBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'book-item';
        li.innerHTML = `
            <div class="book-title"><strong>${book.title}</strong></div>
            <div class="book-details">by ${book.author} • Category: ${book.category || 'Unknown'}</div>
            <div class="due-date">Due Date: ${book.dueDate}</div>
            <button class="delete-btn" data-index="${index}">↩ Return Book</button>
        `;
        bookList.appendChild(li);
    });
    
    // Add event listeners to all delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const bookTitle = borrowedBooks[index].title;
            if (confirm(`Are you sure you want to return "${bookTitle}"?`)) {
                removeBorrowedBook(index);
            }
        });
    });
});

function removeBorrowedBook(index) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    let allBooks = JSON.parse(localStorage.getItem('books')) || [];
    
    if (index >= 0 && index < borrowedBooks.length) {
        const returnedBook = borrowedBooks[index];
        borrowedBooks.splice(index, 1);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        
        // Update the book's availability status in the main books list
        const bookIndex = allBooks.findIndex(book => book.id === returnedBook.id);
        if (bookIndex !== -1) {
            allBooks[bookIndex].available = true;
            localStorage.setItem('books', JSON.stringify(allBooks));
        }
        
        // Show confirmation message
        alert(`"${returnedBook.title}" has been returned successfully.`);
        
        // Reload the list to reflect changes
        location.reload();
    }
}

// Get all books from localStorage
function getAllBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}   