CREATE DATABASE predict_app;
USE predict_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthday DATETIME,
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    revoked BOOLEAN NOT NULL DEFAULT 0,
    UNIQUE KEY token (token)
);

CREATE TABLE discrete_polls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL
);

CREATE TABLE discrete_poll_choices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    choice_text VARCHAR(255) NOT NULL,
    poll_id INT, 
    FOREIGN KEY (poll_id) REFERENCES discrete_polls(id)
);

CREATE TABLE discrete_polls_selections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poll_id INT,
    choice_id INT,
    user_id INT,
    FOREIGN KEY (poll_id) REFERENCES discrete_polls(id),
    FOREIGN KEY (choice_id) REFERENCES discrete_poll_choices(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE continuous_polls (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    min_value FLOAT NOT NULL,
    max_value FLOAT NOT NULL
);

CREATE TABLE continuous_poll_selections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    poll_id INT,
    user_id INT, 
    selected_value FLOAT NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES continuous_polls(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    profile_picture_data MEDIUMBLOB,
    biography VARCHAR(5000),
    birthday DATETIME,
    is_hidden BOOLEAN DEFAULT False,
    FOREIGN KEY (user_id) REFERENCES users(id)
);