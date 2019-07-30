# Velonotes API!



## Route Endpoints
'/api/register'
    1. POST '/register' //TO_DO

'/api/auth'
    1. POST '/login'
      
'/api/bicycles'
    1. GET '/'
    2. POST '/'
    3. GET '/:bike_id'
    4. DELETE '/:bike_id'
    5. PATCH '/:bike_id' //TO_DO
        
'/api/positions'
    1. POST '/'
    2. GET '/:position_id'
    3. DELETE '/:position_id'
    4. PATCH '/:position_id'

'/api/notes'
    1. POST '/'
    2. GET '/:note_id'
    3. DELETE '/:note_id'
    4. PATCH '/:note_id'
    
'/api/uidata'
    1. '/make'
    2. '/size'

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.