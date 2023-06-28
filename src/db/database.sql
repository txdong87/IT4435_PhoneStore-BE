USE api;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  token VARCHAR(255),
  avatar VARCHAR(100),
  role VARCHAR(255),
  is_block INT default(0),
  PRIMARY KEY (id)
);
CREATE TABLE category(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY(id)
)
CREATE TABLE product(
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId integer NOT NULL,
  description varchar(255),
  image varchar(255),
  price integer,
  status varchar(20),
  PRIMARY KEY(id)
)
CREATE TABLE bill(
  id int not null AUTO_INCREMENT,
  uuid varchar(255) not null,
  name varchar(255) not null,
  email varchar(255) not null,
  total int not null,
  productDetails JSON default null,
  PRIMARY KEY(id)
)
INSERT INTO users (username, password, role, is_block)
VALUES ('user1', '1', 'user', 0);

INSERT INTO users (username, password, role, is_block)
VALUES ('user2', '2', 'user', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin1', '1', 'admin1@gmail.com', 'avatar1.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin2', '2', 'admin2@gmail.com', 'avatar2.png', 'admin', 0);

INSERT INTO users (username, password, email, avatar, role, is_block)
VALUES ('admin3', '$2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm', 'admin3@gmail.com', 'avatar2.png', 'admin', 0);
-- $2a$10$VWJc1OnYdThT3CJzwk05GOumF5j3eRIvBsqfZDQ1IYM0./JPznKSm là băm của 3
INSERT INTO category(name)
VALUES ('Iphone')
INSERT INTO category(name)
VALUES ('Samsung')
INSERT INTO category(name)
VALUES ('Oppo')
INSERT INTO category(name)
VALUES ('Xiaomi')


