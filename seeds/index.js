const mongoose = require('mongoose');
const Campground = require('../models/compground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d721d9080a92d7cf2388f7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel eveniet sequi nam dolorem quia totam, harum dignissimos accusamus eos voluptatum adipisci perferendis ex ad eum reiciendis quidem perspiciatis neque tempora?',
            price: price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dntvaynp5/image/upload/v1691845767/YelpCamp/kkcgcp5v8lvpmwzjfrsr.jpg',
                    filename: 'YelpCamp/kkcgcp5v8lvpmwzjfrsr'
                },
                {
                    url: 'https://res.cloudinary.com/dntvaynp5/image/upload/v1691845767/YelpCamp/fj0jan98ywyjsb0ejwuy.jpg',
                    filename: 'YelpCamp/fj0jan98ywyjsb0ejwuy'
                },
                {
                    url: 'https://res.cloudinary.com/dntvaynp5/image/upload/v1691845767/YelpCamp/d2hdgozgpphbuxmd4sxs.jpg',
                    filename: 'YelpCamp/d2hdgozgpphbuxmd4sxs'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})