
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    idDish: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    isVegetarian: { type: Boolean, default: false },
    value: { type: Number, required: true },
    comments: { type: String },
});

module.exports = mongoose.model('Dish', dishSchema);