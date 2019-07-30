# Velonotes API!



## Route Endpoints
1. '/api/register'
    * POST '/register' //TO_DO  

2. '/api/auth'
    * POST '/login'  
      
3. '/api/bicycles'
    * GET '/'
    * POST '/'  
    * GET '/:bike_id'  
    * DELETE '/:bike_id'  
    * PATCH '/:bike_id' //TO_DO  
        
4. '/api/positions'  
    * POST '/'  
    * GET '/:position_id'  
    * DELETE '/:position_id'  
    * PATCH '/:position_id'  

5. '/api/notes'  
    * POST '/'  
    * GET '/:note_id'  
    * DELETE '/:note_id'  
    * PATCH '/:note_id'  
    
6. '/api/uidata'  
    * GET '/make'  
    * GET '/size'  

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.