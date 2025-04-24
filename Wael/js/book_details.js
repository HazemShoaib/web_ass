document.addEventListener('DOMContentLoaded', function() {
    // This would normally fetch data from a server
    // For demo, we'll use localStorage or default data
    
    const searchForm = document.querySelector('search form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value;
            alert(`Searching for: ${query}`);
            // In a real app, this would redirect to search results
        });
    }
    
    // Handle borrow button clicks
    document.querySelectorAll('.borrow-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h1').textContent;
            
            // Store borrowed book
            let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
            borrowedBooks.push({
                title: bookTitle,
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString() // 2 weeks from now
            });
            localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
            
            alert(`You've borrowed "${bookTitle}"`);
        });
    });
});