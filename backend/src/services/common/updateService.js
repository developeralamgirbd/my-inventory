const mongoose = require('mongoose');
const slugify = require("slugify");

const updateService = async (request, Model)=>{

    const id = request.params.id;
    const email = request.auth?.email;
    const ObjectId = mongoose.Types.ObjectId

    request.body.slug = slugify(request.body.name).toLowerCase();


   return await Model.updateOne({_id: ObjectId(id), userEmail: email}, request.body, {runValidators: true});

}

module.exports = updateService;