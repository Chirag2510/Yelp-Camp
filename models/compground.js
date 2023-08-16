const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

//To include the virtuals in objects while using JSON.stringify method.
//otherwise virtuals won't be include in objects
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);


// properties: {
//     popUpMarkup: 'text'
// }
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href='/campgrounds/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(1, 20)}...</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);

