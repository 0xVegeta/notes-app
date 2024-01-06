  # TNotes-App

  ## ⬇️ Installation


  - Clone this repo.

  ```
  $ git clone https://github.com/0xVegeta/notes-app.git
  ```


  - Install dependencies

  ```
  $ npm i
  ```

   - Make an .env file

  ```
  MONGO_URI =  YOUR_MONGO_URI
  JWT_SECRET = YOUR_JWT_SECRET
  ```
 - To start developement server using nodemon (PORT: 3000)

  ```
  $ npm run dev
  ```
  
   - To run server without nodemon

  ```
  $ npm start
  ```


  
   ## Run unit tests


  ```
  $ npm run test
  ```

  

  ## API Reference

  `/api/notes`
  | REQUEST METHODS | ENDPOINTS | DESCRIPTION |
  | :-------------- | :-------: | ------------------: |
  | GET | / | Retrieve the list of all notes of the logged in user |
  | GET | /:id | Retrieve details of a note product by ID |
  | POST | / | Create a new note |
  | PUT | /:id/ | Update details of a specific note by ID |
  | DELETE | /:id | Delete a note by ID |
  | GET | /search/q?= | Search among the notes of the logged in user |
  | POST | /:id/share | Share a specific note by ID |

   `/api/auth`
  | REQUEST METHODS | ENDPOINTS | DESCRIPTION |
  | :-------------- | :-------: | ------------------: |
  | POST | /login | Login as an already registered user |
  | POST | /signup | register yourself on the application (if new user) |