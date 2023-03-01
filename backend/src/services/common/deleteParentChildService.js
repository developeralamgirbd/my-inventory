const mongoose = require("mongoose");

const deleteParentChildService = async (request, parentModel, childModel, jointProperty)=>{

    const session = await mongoose.startSession();
	await session.startTransaction();

    try {
        const options = { session };
        const ObjectId = mongoose.Types.ObjectId;
        const id = request.params.id;
        const userEmail = request.auth?.email;

        // First database process
        const childDeleteQuery = {};
        childDeleteQuery[jointProperty] = ObjectId(id);
        childDeleteQuery.userEmail = userEmail;

        const childDelete = await childModel.deleteMany(childDeleteQuery, options);

        // Second database process
        const parentDeleteQuery = {};
        parentDeleteQuery.userEmail = userEmail;
        parentDeleteQuery._id = ObjectId(id);
        const parentDelete = await parentModel.deleteOne(parentDeleteQuery, options);

        await session.commitTransaction();
        session.endSession();

        return {parentDelete, childDelete};
    }catch (e) {
        await session.abortTransaction();
		session.endSession();
		console.error('Transaction aborted:', e);
       return {error: 'Server error occurred'}
    }
}

module.exports = deleteParentChildService;