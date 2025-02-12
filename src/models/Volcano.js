import { Schema, model, Types } from "mongoose";

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters'],
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [3, 'Location should be at least 3 characters'],
    },
    elevation: {
        type: Number,
        required: [true, 'Elevation is required!'],
        min: [0, 'Elevation should be minimum 0'],
    },
    lastEruption: {
        type: Number,
        required: [true, 'Year of Last Eruption is required!'],
        min: [0, 'Year of Last Eruption should be between 0 and 2025'],
        max: [2025, 'Year of Last Eruption should be between 0 and 2025'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Volcano Image should start with http:// or https://'],
    },
    typeVolcano: {
        type: String,
        required: [true, 'Volcano type is required!'],
        enum: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description should be a minimum of 10 characters long'],
    },
    voteList: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

const Volcano = model('Volcano', volcanoSchema);

export default Volcano;