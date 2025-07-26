# E-commerce Web Application

This is a full-stack e-commerce web application built with the MERN (MongoDB, Express, React, Node.js) stack.

## Features

- User authentication (login)
- Product management (add, edit, delete products)
- Cart management (add, remove items, update quantity)
- Order management (view orders)
- Responsive design

## Technologies Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Context API
- **Authentication**: JSON Web Token (JWT)

## Prerequisites And Setup Instructions 

- Node.js (v14 or higher)
- MongoDB

### Installation

1. **Clone the repository**

Add all 3 folders in one single folder.
then open that folder in VS code editor.
 
2. Starting Backend Server

Open terminal and run this following commands.

cd server
npm run dev
Backend will run in port 5000 and you will see the message in console that connected to mongoDB
(if database not connect or server not start then you can replace your mongodb url in .env file and also replace JWT_TOKEN.)

3. Start Frontend

open another terminal and run following commands (note that do not terminate the server, and do not run this command in previous terminal open new terminal.)

cd client
npm run dev
##client side will run and you can find url in same terminal

4. Start Admin Panel

open another terminal (do not close previous both terminal open new terminal for this)

cd admin
npm run dev

##admin panel will run and you can find urll and port number in same terminal

for admin login
Admin mobile number = 9876543210
Admin Password = admin@5678

All setup done, now you can access the client and admin both side.
