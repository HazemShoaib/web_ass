// /js/search.js
function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.trim();
    
    if (!searchInput) {
        alert('Please enter a book name or author to search');
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const results = books.filter(book => 
        book.name.toLowerCase().includes(searchInput.toLowerCase()) || 
        book.author.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (results.length === 0) {
        alert('No books found matching your search');
        return;
    }

    displaySearchResults(results);
}

function displaySearchResults(results) {
    // Remove existing search results if any
    const existingResults = document.getElementById('searchResults');
    if (existingResults) {
        document.body.removeChild(existingResults);
    }

    // Create search results container
    const searchResultsDiv = document.createElement('div');
    searchResultsDiv.id = 'searchResults';
    searchResultsDiv.style.position = 'fixed';
    searchResultsDiv.style.top = '0';
    searchResultsDiv.style.left = '0';
    searchResultsDiv.style.width = '100%';
    searchResultsDiv.style.height = '100%';
    searchResultsDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
    searchResultsDiv.style.zIndex = '1000';
    searchResultsDiv.style.overflow = 'auto';
    searchResultsDiv.style.padding = '20px';
    searchResultsDiv.style.color = 'white';

    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '✕ Close';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 15px';
    closeButton.style.background = '#ff5555';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(searchResultsDiv);
    });
    searchResultsDiv.appendChild(closeButton);

    // Results title
    const title = document.createElement('h2');
    title.textContent = `Search Results (${results.length})`;
    title.style.marginTop = '40px';
    title.style.textAlign = 'center';
    searchResultsDiv.appendChild(title);

    // Results container
    const resultsContainer = document.createElement('div');
    resultsContainer.style.display = 'flex';
    resultsContainer.style.flexWrap = 'wrap';
    resultsContainer.style.justifyContent = 'center';
    resultsContainer.style.gap = '20px';
    resultsContainer.style.marginTop = '20px';

    // Add each result
    results.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.style.width = '300px';
        bookDiv.style.padding = '20px';
        bookDiv.style.backgroundColor = '#333';
        bookDiv.style.borderRadius = '10px';
        bookDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

        const isAvailable = book.available !== false; // Default to true if not specified

        bookDiv.innerHTML = `
            <div style="text-align: center;">
                <img src="${book.image}" alt="${book.name}" style="max-width: 200px; max-height: 300px; border-radius: 5px;">
            </div>
            <h3 style="margin-top: 15px; color: #4CAF50;">${book.name}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <p style="margin: 10px 0;">${book.description}</p>
            <p style="color: ${isAvailable ? '#28a745' : '#dc3545'}; font-weight: bold;">${isAvailable ? 'Available' : 'Unavailable'}</p>
            <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                <a href="/html/book_info.html?id=${book.id}" class="btn" style="padding: 8px 15px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">View Details</a>
                <button class="borrow-button" data-book-id="${book.id}" 
                    style="padding: 8px 15px; background: ${isAvailable ? '#2196F3' : '#6c757d'}; color: white; border: none; border-radius: 5px; cursor: ${isAvailable ? 'pointer' : 'not-allowed'}; opacity: ${isAvailable ? '1' : '0.5'};"
                    ${!isAvailable ? 'disabled' : ''}>
                    ${isAvailable ? 'Borrow' : 'Not Available'}
                </button>
            </div>
        `;

        resultsContainer.appendChild(bookDiv);
    });

    searchResultsDiv.appendChild(resultsContainer);
    document.body.appendChild(searchResultsDiv);

    // Add event listeners to borrow buttons
    document.querySelectorAll('.borrow-button:not([disabled])').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.getAttribute('data-book-id');
            borrowBook(bookId);
        });
    });
}

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
        
        // Close search results after borrowing
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            document.body.removeChild(searchResults);
        }
        
        // Reload the current page to reflect changes
        window.location.reload();
    } else {
        alert('This book is not available for borrowing.');
    }
}