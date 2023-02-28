const checkAssociateService = async (query, AssociateModel)=>{

    const data = await AssociateModel.aggregate([
        {$match: query}
    ]);
    return data.length > 0
}

module.exports = checkAssociateService;