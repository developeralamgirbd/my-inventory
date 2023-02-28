const mongoose = require('mongoose');

const getByIdService = async (request, Model)=>{
    const id = request.params.id;
    const email = request.auth?.email;
    const ObjectId = mongoose.Types.ObjectId

    const data = await Model.aggregate([
        {$match: {_id: ObjectId(id), userEmail: email}}
    ]);

    return data[0];

}

module.exports = getByIdService;