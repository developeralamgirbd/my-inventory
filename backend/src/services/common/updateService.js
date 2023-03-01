const mongoose = require('mongoose');

const updateService = async (request, Model)=>{

    const id = request.params.id;
    const email = request.auth?.email;
    const ObjectId = mongoose.Types.ObjectId

   return await Model.updateOne({_id: ObjectId(id), userEmail: email}, request.body, {runValidators: true});

}

module.exports = updateService;