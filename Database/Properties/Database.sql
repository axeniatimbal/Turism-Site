-- Database schema for TravelGo tourism site

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Bookings (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL, -- NULL if not logged in
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    destination NVARCHAR(100) NOT NULL,
    message NVARCHAR(500) NOT NULL,
    booking_date DATETIME DEFAULT GETDATE()
);