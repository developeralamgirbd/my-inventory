const dropDownService = async (request, Model, projection)=>{
    const email = request.auth?.email;
    const data = await Model.aggregate([
        {$match: {userEmail: email}},
        {$project: projection}
    ]);
    return data
}

module.exports = dropDownService;