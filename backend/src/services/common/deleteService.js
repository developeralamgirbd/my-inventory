const mongoose = require('mongoose');

const deleteService = async (request, Model)=>{
    const id = request.params.id;
    const email = request.auth?.email;
    const ObjectId = mongoose.Types.ObjectId

    const data = await Model.deleteOne({_id: ObjectId(id), userEmail: email});
    return data;

}

module.exports = deleteService