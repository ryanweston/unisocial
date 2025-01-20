⚠️ This is an unmaintained university project

# UNISOCIAL

**What is UNISOCIAL?** This application is a platform for university students to share reviews on their university based on social factors, as a response to the limitations that other similar services offer. For example, being  more focused to academic, as opposed to social factors.

**You need a university email to register.** If you'd like to view the site from a registered user's perspective, e.g review submission, and you don't have access to a university email, please contact me. 

**Disclaimer**: The project was developed as part of a recent university module and as such, no changes to the source code can be made  yet. Hopefully this explains some of the lack of polish seen in some areas of the site due to time constraints.


## Roadmap

**Goal**: UNISOCIAL will be the go-to platform for future students to get information relating to their universities social life, across a variety of factors. The list below is a diverse range of features I wish to add in the near future. 

- ➕  Add a larger variety of different data types, e.g make use of weather api for the local weather.
- 🎨  Soft restyling of the header/brand of the site to eliminate excessive white space/improve above the fold UX/UI.
- 🧹  Overall UI cleanup, especially in terms of buttons & delete buttons. Cross-browser support with Safari also.
- 📌 Add Travis CI to the project alongside testing scripts due to the continuous interagration approach used with Heroku.
- ✉ Email authentication needs to be added before official deployment.
- ✏ Text based reviews for further user input and detailed reviews.
- 📁 Import and convert UNISTATS data-set to allow for further features, e.g specific campus reviews and location data.
- 🌍 Map display of the universities and their relevant scores.


## Build Instructions


Install the project's server packages.

```javascript
> npm install
```

Install the project's React packages.

```javascript
> cd client
> npm install
```
Initiate Express server.
```javascript
> npm run server
```

## Technologies

- **MongoDB**
- **NodeJS**
    - Express
    - Express Validator
    - JWT Authentication
    - Request
    - RP (Request Promise)
    - bcrypt
    - Concurrently
    - Nodemon (dev)
    - Mongoose
    - config 
 - **React**
 	- Redux
 	- Redux Dev Tools (dev)
 	- Redux Thunk
 	- Axios
 	- UUID
 	- React Google Recaptcha
 	- HTTPS Redirect
  
## License 

Feel free to contribute fixes/updates/ideas. As long as it remains open-source, you can also clone and build upon the source code for private use or to build upon for a similar, review based, project/idea.  However, please don't republish the code and rebrand the product if it is in anyway similar to a university review system. Thank you!
