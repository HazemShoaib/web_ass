document.addEventListener('DOMContentLoaded', function() {
    const defaultBooks = [
        {
            id: "1",
            name: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "Classic",
            description: "A novel set in the Roaring Twenties",
            image: "/images/The_Great_Gatsby_Cover_1925_Retouched.jpg"
        },
        {
            id: "2",
            name: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            category: "Fantasy",
            description: "A young wizard's journey begins",
            image: "/images/Harry_Potter.jpg"
        },
        {
            id: "3",
            name: "To Kill a Mockingbird",
            author: "Harper Lee",
            category: "Drama",
            description: "A powerful story about justice and race",
            image: "/images/to_kill_a_mockingbird.jpg"
        }
    ];

    if (!localStorage.getItem('books')) {
        localStorage.setItem('books', JSON.stringify(defaultBooks));
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const booksByCategory = {};
    
    books.forEach(book => {
        if (!booksByCategory[book.category]) {
            booksByCategory[book.category] = [];
        }
        booksByCategory[book.category].push(book);
    });

    const booksContainer = document.getElementById('books-container');
    const firstCategory = document.querySelector('.Category');
    booksContainer.innerHTML = '';

    Object.entries(booksByCategory).forEach(([category, categoryBooks], index) => {
        const categorySection = index === 0 ? firstCategory : firstCategory.cloneNode(true);
        categorySection.querySelector('h2').textContent = `${category} Books`;
        
        const bookList = categorySection.querySelector('.book-list');
        bookList.innerHTML = '';
        
        categoryBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            
            const bookLink = document.createElement('a');
            bookLink.href = `/html/book_info.html?id=${book.id}`;
            
            const bookImage = document.createElement('img');
            bookImage.src = book.image;
            bookImage.alt = book.name;
            
            bookLink.appendChild(bookImage);
            bookDiv.appendChild(bookLink);
            bookList.appendChild(bookDiv);
        });
        
        booksContainer.appendChild(categorySection);
    });
});