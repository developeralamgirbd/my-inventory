const mongoose = require("mongoose");

const createParentChildService = async (request, parentModel, childModel, jointProperty)=>{

    const session = await mongoose.startSession();
	await session.startTransaction();

    try {
        const options = { session };

        // First database process
        const parentBody = request.body?.parent;
        parentBody.userEmail = request.auth?.email;

        const parent = new parentModel(parentBody);
        await parent.save(options)

        // Second database process
        const childrenBody = request.body?.children;
        childrenBody.reduce((previous, current)=> {
            return [...previous, current.userEmail = request.auth?.email, current[jointProperty] = parent?._id]
        }, []);

        const children = await childModel.insertMany(childrenBody, options);

        await session.commitTransaction();
        session.endSession();

        return {parent, children};
    }catch (e) {
        await session.abortTransaction();
		session.endSession();
		console.error('Transaction aborted:', e);
       return {error: 'Server error occurred'}
    }
}

module.exports = createParentChildService;