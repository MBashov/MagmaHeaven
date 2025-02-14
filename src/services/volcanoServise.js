import Volcano from "../models/Volcano.js"

export default {

    create(volcanoData, userId) {
        return Volcano.create({ ...volcanoData, owner: userId });

    },

    getAll() {
        return Volcano.find({}).select({ name: true, location: true, typeVolcano: true, image: true });
    },

    getOne(volcanoId) {
        return Volcano.findById(volcanoId);
    },

    delete(volcanoId) {
        return Volcano.findByIdAndDelete(volcanoId);
    },

    edit(volcanoId, volcano) {
        return Volcano.findByIdAndUpdate(volcanoId, volcano, { runValidators: true });
    },
}