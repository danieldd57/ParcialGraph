
const Dish = require('../util/Dish'); 

const resolvers = {
    
    getAllDishes() { 
        try {
            return Dish.find({});
        } catch (error) {
            console.error("Error: getAllDishes.");
            throw new Error("Error al obtener la lista de dishes.");
        }
    },
    
    getDishById(args) { 
        try {
            const dishId = args.id;
            return Dish.findById(dishId);
        } catch (error) {
            console.error(`Error: getDishById - ${args.id}).`);
            throw new Error("Error al buscar por ID.");
        }
    },
    
    getDishesBetweenCalories(args) {
        const minCalories = args.min;
        const maxCalories = args.max;

        try {
            return Dish.find({
                calories: { $gte: minCalories, $lte: maxCalories }
            });
        } catch (error) {
            console.error(`Error: getBetweenCalories`);
            throw new Error("Error al filtrar por calorias.");
        }
    },

    
    async createDish(args) { 
        const dishData = args.input;
        
        try {
            const newDish = new Dish(dishData);
            return await newDish.save();
        } catch (error) {
            console.error(`Error: createDish`);
            throw new Error("Error al crear nuevo dish");
        }
    },
    
    async updateDish(args) { 
        const dishId = args.id;
        const updates = args.input;

        try {
            const updatedDish = await Dish.findByIdAndUpdate(
                dishId, 
                updates, 
                { new: true } 
            );

            if (!updatedDish) {
                return null; 
            }
            return updatedDish;

        } catch (error) {
            console.error(`Error : updateDish`);
            throw new Error("Error al actualizar un dish");
        }
    },
    
    async deleteDish(args) {
        const dishId = args.id;
        
        try {
            const deletedDish = await Dish.findByIdAndDelete(dishId);
            
            if (!deletedDish) {
                return null; 
            }
            return deletedDish;
        } catch (error) {
            console.error(`Error : deleteDish`);
            throw new Error("Error al eliminar el dish.");
        }
    },
};

module.exports = resolvers;