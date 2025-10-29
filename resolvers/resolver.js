
const Dish = require('../util/Dish'); 

const resolvers = {
    // Queries (READ)
    getAllDishes: async () => {
        return await Dish.find({});
    },
    
    getDishById: async ({ id }) => {
        return await Dish.findById(id);
    },
    
    getDishesBetweenCalories: async ({ min, max }) => {
        return await Dish.find({
            calories: { $gte: min, $lte: max }
        });
    },

    // Mutations (CREATE, UPDATE, DELETE)
    createDish: async ({ input }) => {
        const newDish = new Dish(input);
        return await newDish.save();
    },
    
    updateDish: async ({ id, input }) => {
        return await Dish.findByIdAndUpdate(
            id, 
            input, 
            { new: true } 
        );
    },
    
    deleteDish: async ({ id }) => {
        return await Dish.findByIdAndDelete(id);
    },
};

module.exports = resolvers;