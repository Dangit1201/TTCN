const mongoose = require("../../common/database")();

const commentSchema = mongoose.Schema(
    {

        prd_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
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
        body: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", commentSchema, "Comments");
module.exports = CommentModel;
