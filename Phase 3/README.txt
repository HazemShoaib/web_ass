# Online Library Management System

A web-based library management system built with Django and JavaScript.

## Prerequisites

- Python 3.x
- pip (Python package manager)
- Git

## Installation

1. Clone the repository
```sh
git clone <repository-url>
cd web_ass
```

2. Create a virtual environment (recommended)
```sh
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies
```sh
pip install -r requirements.txt
```

## Database Setup

1. Apply the migrations
```sh
cd backend
python manage.py makemigrations
python manage.py migrate
```

2. Create a superuser (admin)
```sh
python manage.py createsuperuser
```

## Running the Application

1. Start the Django development server
```sh
python manage.py runserver
```

2. Access the application:
- Frontend: Open any HTML file in your browser directly or use a local server
- Admin interface: http://127.0.0.1:8000/admin/
- API endpoints: http://127.0.0.1:8000/api/

## Project Structure

```
web_ass/
├── backend/           # Django backend
│   ├── api/          # API application
│   └── backend/      # Project settings
└── static/           # Static files (CSS, JS, images)
```

## Features

- User authentication (login/signup)
- Admin dashboard for book management
- User dashboard for browsing books
- Book borrowing system
- Search functionality
- Responsive design

## API Endpoints

- `/api/books/` - Book management
- `/api/users/` - User management
- `/api/borrowed/` - Borrowed books management

## Technologies Used

- Backend:
  - Django 5.0.2
  - Django REST Framework 3.14.0
  - SQLite database

- Frontend:
  - HTML
  - CSS
  - JavaScript

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.