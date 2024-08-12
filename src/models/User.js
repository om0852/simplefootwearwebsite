const { Schema, models, model } = require("mongoose");

const ModelSchema =new Schema({
    email:String,
    password:String,
    type:String
});
const User = models.user || model("user",ModelSchema);
export default User