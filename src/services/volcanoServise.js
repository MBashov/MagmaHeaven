import Volcano from "../models/Volcano.js"

export default {

    create(volcanoData, userId) {
        return Volcano.create({ ...volcanoData, owner: userId });

    },

    getAll(filter = {}) {
        let query = Volcano.find({}).select({ name: true, location: true, typeVolcano: true, image: true });

        if (filter.name) {
            query = query.find({ name: { $regex: filter.name, $options: 'i' } }).select({ name: true, location: true, typeVolcano: true, image: true });
        }

        if (filter.typeVolcano) {
            query = query.find({ typeVolcano: filter.typeVolcano }).select({ name: true, location: true, typeVolcano: true, image: true });
        }

        return query;
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

    vote(volcanoId, userId) {
        return Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: userId } })
    }
}