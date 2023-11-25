CREATE DATABASE predict_app;
USE predict_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthday DATETIME,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
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

CREATE TABLE polls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    poll_type ENUM('discrete', 'continuous') NOT NULL,
    openVisibility BOOLEAN NOT NULL,
    setDueDate BOOLEAN NOT NULL,
    closingDate DATE,
    numericFieldValue INT,
    selectedTimeUnit ENUM('min', 'h', 'day', 'mth')
);

CREATE TABLE discrete_polls (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES polls(id)
);

CREATE TABLE continuous_polls (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES polls(id),
    cont_poll_type ENUM('date', 'numeric') NOT NULL
);

CREATE TABLE discrete_poll_choices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    choice_text VARCHAR(255) NOT NULL,
    poll_id INT, 
    FOREIGN KEY (poll_id) REFERENCES polls(id)
);

CREATE TABLE discrete_polls_selections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    poll_id INT,
    choice_id INT,
    user_id INT,
    given_points INT,
    FOREIGN KEY (poll_id) REFERENCES polls(id),
    FOREIGN KEY (choice_id) REFERENCES discrete_poll_choices(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE continuous_poll_selections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    poll_id INT,
    user_id INT, 
    given_points INT,
    float_value FLOAT,
    date_value DATE,
    FOREIGN KEY (poll_id) REFERENCES polls(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    points INT NOT NULL,
    biography VARCHAR(5000),
    birthday DATETIME,
    isHidden BOOLEAN DEFAULT False,
    unique(userId),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userRank INT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    poll_id INT,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE SET NULL
);