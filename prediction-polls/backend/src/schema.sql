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
    isMod BOOLEAN NOT NULL DEFAULT 0,
    last_login DATETIME,
    participated_polls INT DEFAULT 0,
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
    selectedTimeUnit ENUM('min', 'h', 'day', 'mth'),
    tagsScanned INT DEFAULT 0
    isOpen BOOLEAN DEFAULT true
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
    userId INT NOT NULL,
    isSelected BOOLEAN DEFAULT False,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    poll_id INT,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE SET NULL
);

CREATE TABLE mod_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    UNIQUE(userId,topic)
);

CREATE TABLE mod_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    poll_id INT NOT NULL,
    request_type ENUM('report','discrete', 'continuous' ) NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls(id),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE mod_promotion_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    UNIQUE(userId),
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE mod_request_report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    ban_poll BOOLEAN,
    FOREIGN KEY (request_id) REFERENCES mod_requests(id) ON DELETE CASCADE
);

CREATE TABLE mod_request_discrete (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    choice_id INT,
    FOREIGN KEY (request_id) REFERENCES mod_requests(id) ON DELETE CASCADE
);

CREATE TABLE mod_request_continuous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT,
    float_value FLOAT,
    date_value DATE,
    FOREIGN KEY (request_id) REFERENCES mod_requests(id) ON DELETE CASCADE
);

CREATE TABLE user_follow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    follow_status BOOLEAN,
    FOREIGN KEY (follower_id) REFERENCES profiles(userId) ON DELETE CASCADE
    FOREIGN KEY (followed_id) REFERENCES profiles(userId) ON DELETE CASCADE
);

CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    UNIQUE(user_id),
    poll_id INT NOT NULL,
    UNIQUE(poll_id),
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (poll_id) REFERENCES polls(id)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    UNIQUE(user_id),
    poll_id INT NOT NULL,
    UNIQUE(poll_id),
    comment_text TEXT NOT NULL,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (poll_id) REFERENCES polls(id)
);
