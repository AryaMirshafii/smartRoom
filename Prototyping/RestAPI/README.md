An API for the Myuzic IOS application that implements REST standards. The api allows the Myuzic app to store and retrieve data about songs the user listened to, as well as analyzing this data using a TensorFlow neural network linear regression model. The output of this TensorFlow model is stored and returned through the /aiPredictions routes. The TensorFlow model is written in Python and Keras.


The API can be run by typing "npm run startmongo" , followed by "npm run startapi" into the terminal. This will launch the mongodb instance, open the API for any http requests, and run the back end to start making predictions every 2 minutes.

This API has 6 Routes


/songs

/songs/songID

The above are used to store and retrieve JSON data of the songs that the user listened to.



/aiPredictions 

/aiPredictions/predictionID

The above are used to store and retrieve JSON data of the predictions made by the Tensorflow model.



/allSongs

/allSongs/songID


The above are used to store data about all of the songs on my computer onto the mongodb server. The tensorflow model makes a prediction based on BPM of the songs stored in the /songID route and then compares the array of prediction values to the songs in /allSongs. The results are placed in /aiPredictions.

