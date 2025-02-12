import Volcano from "../models/Volcano.js"

export default {

    create(volcanoData, userId) {
        return Volcano.create({ ...volcanoData, owner: userId });

    }
}