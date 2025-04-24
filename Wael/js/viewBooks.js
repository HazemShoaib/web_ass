document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
});

function loadBooks() {
    const defaultBooks = [
        {
            id: "1",
            name: "Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "Classic",
            description: "A novel set in the Roaring Twenties",
            image: "/images/The_Great_Gatsby_Cover_1925_Retouched.jpg"
        },
        {
            id: "2",
            name: "To Kill a Mockingbird",
            author: "Harper Lee",
            category: "Drama",
            description: "A story about racial injustice",
            image: "/images/to_kill_a_mockingbird.jpg"
        }
    ];

    if (!localStorage.getItem('books')) {
        localStorage.setItem('books', JSON.stringify(defaultBooks));
    }

    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    displayBooks(savedBooks);
}

function displayBooks(books) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td><h2>${book.name}</h2></td>
            <td><h2>${book.author}</h2></td>
            <td><h2>${book.category}</h2></td>
            <td><h2>${book.description}</h2></td>
            <td><img src="${book.image}" alt="${book.name}" style="width: 60px;" /></td>
        `;
        tbody.appendChild(row);
    });
}
