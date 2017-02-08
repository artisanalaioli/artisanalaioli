import express from 'express';
import routes from './utils/routes';
import middleware from './utils/middleware';

var _ = require('underscore');
var app = express();

middleware(app,express);
routes(app, express);

app.listen(3000, function() {
  console.log('listening on port 3000');

});

export { app };

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision')({
  	projectId: 'AIzaSyDp_Bl-MD9PhAu3-SqWaLo5vf9cQLQa3NM',
  	keyFilename: './server/Divvy-8f936cd51c11.json'
})

vision.detectText('https://media-cdn.tripadvisor.com/media/photo-s/03/63/af/02/george-s-italian-restaurant.jpg')
.then((results => {
	console.log( parseImageData( results ) )
})).catch( (err) => {
	console.log(err)
});
  

var parseImageData = function( data ) {
	var strings = data[0]
	var itemList = [];
	var nameOfDish = [];
	data.filter( (value) => {
		return typeof value === 'string';
	})
	for(var i = 1; i < strings.length; i++) {
		
		if( _.contains(strings[i].split(''), '.') ){
		// 	var current = strings[i-1]
		// 	var index = i - 1;
		// 	while( !_.contains(strings[index].split(''), '.') ) {
		// 		nameOfDish.push(strings[index])

		// 		index--;
		// 	}

			// console.log(strings[i])
			itemList.push({
				name: strings[i -1],
				price: Number(strings[i])
			})
		}
	}
	return itemList
}  