const getTwoJoinService = async (request, Model, searchArr, joinStage1, joinStage2)=>{

    const perPage = Number(request.params.perpage);
    const page = Number(request.params.page);
    const searchKeyword = request.params.keyword;
    const skip = (page - 1) * perPage;
    const email = request.auth?.email;

    let data;

    if (searchKeyword !== '0'){
        const searchQuery = {$or: searchArr}
        data = await Model.aggregate([
            {$match: {userEmail: email}},
            joinStage1,joinStage2,
            {$match: searchQuery},
            {
                $facet:{
                    total:[{$count: "count"}],
                    rows:[{$skip: skip}, {$limit: perPage}],
                }
            }
        ]);

    }else {
        data = await Model.aggregate([
            {$match: {userEmail: email}},
            joinStage1, joinStage2,
            {
                $facet:{
                    total:[{$count: "count"}],
                    rows:[{$skip: skip}, {$limit: perPage}],
                }
            }
        ]);
    }

    return {total: data[0]?.total[0]?.count, rows: data[0]?.rows}
}

module.exports = getTwoJoinService;