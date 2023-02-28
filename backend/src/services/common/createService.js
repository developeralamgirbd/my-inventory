const createService = async (request, Model)=>{
        request.body.userEmail = request.auth?.email;
        const data = new Model(request.body);
        await data.save();
        return data;
}

module.exports = createService;