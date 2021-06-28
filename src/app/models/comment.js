const mongoose = require("../../common/database")();

const commentSchema = mongoose.Schema({
        rating:{
            type:Number,
            default:5,
        },
        full_name: {
            type: String,
            default: null,
        },
        email: {
            type: String,
            default: null,
        },
        prd_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            default: null,
        },
        body: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;
