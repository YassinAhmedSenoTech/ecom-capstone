E-Commerce Capstone


This is a full-stack e-commerce application built to manage products, customer orders, and system inventory. It provides a seamless shopping experience for customers and a comprehensive dashboard for administrators



Technologies Used
Frontend: React, React Router, Axios

Backend: Node.js, Express

Databases: PostgreSQL (for orders/users), MongoDB (for product logs/metadata)

Containerization: Docker, Docker Compose

Authentication: JWT (JSON Web Tokens)

How to Run the Project

Clone the repository to your local machine.


Run the following command in your terminal:
docker compose up --build

Once the services are running, the application will be accessible at the URLs listed below.

Project URLs


Frontend: http://localhost:3000/

Backend: http://localhost:5000
Backend Health Check: http://localhost:5000/health

GitHub : https://github.com/YassinAhmedSenoTech/ecom-capstone

Important Notes



Quick note that the admin dashboard wont be visible unless you log in as an admin and also a quick notice deleting products while orders exist that  have these products will result in an error , make sure there is no orders having the product you want to delete  before deleting any product and same with categories if you want to delete a category make sure no product is registered under that same category.

Quick note that nodemailer works but the ISP blocks the request in order to be able to send a complete full mail you have to use a vpn
	

Test Account Credentials

FOR ADMIN :

email : admin@example.com
password: Admin

FOR USER :

email : user@example.com
password: User


if node modules dont exist and you want to run the tests through docker run this in the backend directory in the terminal after docker initializes 

Testing backend :

docker compose exec -e NODE_ENV=test backend npm test

Testing Frontend : 

docker compose run --rm frontend npm test


 


