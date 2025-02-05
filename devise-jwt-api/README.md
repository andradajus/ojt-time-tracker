# Devise JWT API

This project is a Ruby on Rails application that implements user authentication using Devise and JWT (JSON Web Tokens). It provides a simple API for user registration, login, and session management.

## Features

- User registration
- User login
- JWT token generation for authentication
- API-only application structure

## Getting Started

### Prerequisites

- Ruby (version 2.7 or higher)
- Rails (version 6.0 or higher)
- PostgreSQL (or your preferred database)

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/devise-jwt-api.git

2. Navigate to the project directory:

   cd devise-jwt-api

3. Install the required gems:

   bundle install

4. Set up the database:

   rails db:create
   rails db:migrate

### Configuration

- Configure Devise in `config/initializers/devise.rb` to set up JWT settings such as token expiration and secret key.

### Usage

- Start the Rails server:

   rails server

- You can now access the API endpoints for user registration and login.

### API Endpoints

- **POST /users**: Create a new user
- **POST /users/sign_in**: Log in a user and receive a JWT token
- **GET /users/:id**: Retrieve user information (requires JWT token)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.