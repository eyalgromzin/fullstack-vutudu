const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectID;
// const db = require('mongodb')
// const mongoose = require('mongoose');

// Item Model
const Item = require('../../models/Item');



// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/getIdeaByID/', (req, res) => {   //TODO
	Item.findById(ideaID)
	.then(
		(items) => 
			res.json(items)
		);
});

// @route   POST api/items/createIdea
// @desc    Create An Item
// @access  Public
router.post('/createIdea/', (req, res) => {
	const newItem = new Item({
		title: req.body.idea.title,
		content: req.body.idea.content,
		createdBy: req.body.idea.createdBy,
		createdIn: req.body.idea.createdIn,
		place: req.body.idea.place,
		minTime: req.body.idea.minTime,
		maxTime: req.body.idea.maxTime,
		minNumOfPeople: req.body.idea.minNumOfPeople,
		maxNumOfPeople: req.body.idea.maxNumOfPeople,
		tags: req.body.idea.tags
	});

	newItem.save().then((item) => res.json(item));
});

router.post('/ideaLiked/', (req, res) => {
	console.log('ideaLiked: updating idea ' + req.body.ideaID);

	Item.findOneAndUpdate(
		{ _id: req.body.ideaID },
		{
			$push: { liked: req.body.userID },
		},
		{ new: true }
	).then((items) => res.json(items));
});

// @route   POST api/items/removeIdeaLiked/
// @desc    search for anything
// @access  Public
router.post('/removeIdeaLiked/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('ideaLiked: updating idea ' + ideaID);

	Item.findOneAndUpdate(
		{ _id: ideaID }, //{'_id': ObjectID(ideaID)}
		{
			$pull: { liked: req.body.userID }
		},
		{ new: true }
	).then((items) => res.json(items));
});

// @route   POST api/items/ideaDisliked/
// @access  Public
// doesnt work
router.post('/ideaDisliked/', (req, res) => {
	console.log('ideaDisliked: updating idea ' + req.body.idea._id.toString());

	var ideaID = req.body.idea._id;

	Item.findOneAndUpdate(
		{ _id: ideaID }, //{'_id': ObjectID(ideaID)}
		{ 	
			$push: { disliked: req.body.userID },
		},	
		{ new: true }
	).then((items) => res.json(items));
});

// @route   POST api/items/ideaDisliked/
// @access  Public
// doesnt work
router.post('/removeIdeaDisliked/', (req, res) => {
	console.log('ideaDisliked: updating idea ' + req.body.idea._id.toString());

	var ideaID = req.body.idea._id;

	Item.findOneAndUpdate(
		{ _id: ideaID }, //{'_id': ObjectID(ideaID)}
		{ 
			$pull: { disliked: req.body.userID },
		},
		{ new: true }
	).then((items) => res.json(items));
});

// @route   POST api/items/addHardToIdea/
// @access  Public
router.post('/addHardToIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('addHardToIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);

	Item.findOneAndUpdate(
		{ _id: ideaID },
		{
			$push: { addedHard: req.body.userID },
			$inc: { hardCount: 1 }
		}
	).then((items) => res.json(items));
	console.log('updated idea hard ' + ideaID);
});

// @route   POST api/items/removeHardFromIdea/
// @access  Public
router.post('/removeHardFromIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('removeHardFromIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);

	Item.findOneAndUpdate(
		{ _id: ideaID },
		{
			$pull: { addedHard: req.body.userID },
			$inc: { hardCount: -1 }
		}
	).then((items) => res.json(items));
	console.log('updated idea hard ' + ideaID);
});

// @route   POST api/items/removeHardFromIdea/
// @access  Public
router.post('/removeEasyFromIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('removeEasyFromIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);

	Item.findOneAndUpdate({ _id: ideaID }, { $pull: { addedEasy: req.body.userID } }).then((items) => res.json(items));
	console.log('updated idea easy ' + ideaID);
});

// @route   POST api/items/addedEasyToIdea/
// @access  Public
router.post('/addedEasyToIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('addedEasyToIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);

	Item.findOneAndUpdate({ _id: ideaID }, { $push: { addedEasy: req.body.userID } }).then((items) => res.json(items));
	console.log('updated idea easy ' + ideaID);
});

// @route   POST api/items/addLongToIdea/
// @access  Public
router.post('/addLongToIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('addedLongToIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);
	Item.findOneAndUpdate({ _id: ideaID }, { $push: { addedLong: req.body.userID } }).then((items) => res.json(items));
	console.log('updated idea' + req.body.ideaID);
});

// @route   POST api/items/addLongToIdea/
// @access  Public
router.post('/removeLongFromIdea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('removedLongFromIdea: updating idea' + ideaID);
	console.log('userID: ' + req.body.userID);
	Item.findOneAndUpdate({ _id: ideaID }, { $pull: { addedLong: req.body.userID } }).then((items) => res.json(items));
	console.log('updated idea' + req.body.ideaID);
});

// @route   POST api/items/addedShortToIDea/
// @access  Public
router.post('/addShortToIDea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('addedShortToIdea: updating idea' + ideaID);
	console.log('ideaID: ' + ideaID + ', userID: ' + req.body.userID);

	Item.findOneAndUpdate({ _id: req.body.idea._id }, { $push: { addedShort: req.body.userID } }).then((items) =>
		res.json(items)
	);
	console.log('updated idea' + req.body.ideaID);
});

// @route   POST api/items/addedShortToIDea/
router.post('/removeShortFromIDea/', (req, res) => {
	var ideaID = req.body.idea._id;
	console.log('removed Short from Idea: ' + ideaID);
	console.log('userID: ' + req.body.userID);

	Item.findOneAndUpdate({ _id: req.body.idea._id }, { $pull: { addedShort: req.body.userID } }).then((items) =>
		res.json(items)
	);
	console.log('updated idea' + req.body.ideaID);
});

// @route   GET api/search/:place/:time/:numOfPeople/:more
// @desc    search with more
router.get('/search/:place/:time/:numOfPeople/:more', (req, res) => {
	console.log('searching ideas with more');
	
	let $and = []
	
	if(req.params.place !== undefined && req.params.place != "" && req.params.place != "_"){
		$and.push({places: req.params.place})
	}
	if(req.params.time !== undefined && req.params.time != "" && req.params.time != "_"){
		$and.push({ minTime: { $lte: req.params.time } }, { maxTime: { $gte: req.params.time } })
	}
	if(req.params.numOfPeople !== undefined && req.params.numOfPeople != "" && req.params.numOfPeople != "_"){
		$and.push({ minNumOfPeople: { $lte: req.params.numOfPeople } }, { maxNumOfPeople: { $gte: req.params.numOfPeople } })
	}
	if(req.params.more !== undefined && req.params.more != "" && req.params.more != "_"){
		$and.push({ subjects: req.params.more })
	}

	var query = {$and}
	
	// let query = {
	// 	$and: [
	// 		{ place: req.params.place },
	// 		{ time: req.params.time },
	// 		{
	// 			$and: [
	// 				{ minNumOfPeople: { $lte: req.params.numOfPeople } },
	// 				{ maxNumOfPeople: { $gte: req.params.numOfPeople } }
	// 			]
	// 		},
	// 		{ tags: req.params.more }
	// 	]
	// }

	Item.find(query).then((items) => { 
		res.json(items)
	});
});

// // @route   GET api/search/:place/:time/:numOfPeople/
// // @desc    search without more
// // @access  Public
// router.get('/search/:place/:time/:numOfPeople', (req, res) => {
// 	console.log('finding without more');
	
// 	let $and = []
	
// 	if(req.params.place !== undefined && req.params.place != ""){
// 		$and.push({place: req.params.place})
// 	}
// 	if(req.params.time !== undefined && req.params.time != ""){
// 		$and.push({ minTime: { $lte: req.params.time } }, { maxTime: { $gte: req.params.time } })
// 	}
// 	if(req.params.numOfPeople !== undefined && req.params.numOfPeople != ""){
// 		$and.push({ minNumOfPeople: { $lte: req.params.numOfPeople } }, { maxNumOfPeople: { $gte: req.params.numOfPeople } })
// 	}

// 	var query = {$and}

// 	Item.find(query).then(
// 		(items) => 
// 		res.json(items)
// 		);
// });

// @route   POST api/items/deleteIdea/
// @desc    update idea
// @access  Public
router.post('/deleteIdea/', (req, res) => {
	console.log('in items router: deleting idea: ' + req.body.ideaID);
	Item.findById(req.body.ideaID).then((item) => item.remove().then(() => res.json({ success: true })));
});

// @route   POST api/items/getIdeaByID/
// @desc    update idea
// @access  Public
router.post('/getIdeaByID/', (req, res) => {
	console.log('in items router: deleting idea: ' + req.body.ideaID);
	Item.findOne({ _id: req.body.ideaID }).then((items) => {
		return res.json(items);
	});
});

// @route   POST api/items/getIdeaByTitle/
// @desc    update idea
// @access  Public
router.post('/getIdeaByTitle/', (req, res) => {
	console.log('getting idea with title: ' + req.body.title);
	Item.findOne({ title: req.body.title }).then((items) => {
		return res.json(items);
	});
});

// @route   POST api/items/updateIdeaContentAndTitle/
// @desc    update idea
// @access  Public
router.post('/updateIdeaContentAndTitle/', (req, res) => {
	console.log('updating idea: ' + req.body.ideaID);
	console.log('new title: ' + req.body.title);
	console.log('new content: ' + req.body.content);

	Item.findOneAndUpdate(
		{ _id: req.body.ideaID },
		{ $set: { title: req.body.title, content: req.body.content } },
		{ new: true }
	).then((items) => {
		console.log('updated idea: ' + req.body.ideaID);
		return res.json(items);
	});
});


// @route   POST api/items/getTopLikedIdeas/
// @desc    gets the ideas with most likes
// @access  Public
router.post('/getTopLikedIdeas/', (req, res) => {
	console.log('getting top liked ideas');
	Item.aggregate([
		{$addFields: { likedCount: { $size: "$liked" }}},	//{ $size: $liked }
		{$sort: { likedCount: -1 }},
	]).limit(5).then((items) => {
		console.log('got top liked ideas');
		return res.json(items);
	});
});

// @route   POST api/items/getTopLikedPercentageIdeas/
// @desc    gets the ideas with most likes + dislikes
// @access  Public
router.post('/getTopLikedPercentageIdeas/', (req, res) => {
	console.log('getting top newest ideas');
	Item.aggregate([
		{$addFields: { likedCount: { $size: "$liked" }}},			//doesnt work :/
		{$addFields: { dislikedCount: { $size: "$disliked" }}},
		{$addFields: { likeAndDislikeCount: { $add: ["$likedCount", "$dislikedCount"] }}},
		{$match: { likeAndDislikeCount: { $ne: 0 }}},
		{$addFields: { likedPercentage: { $divide: ["$likedCount", "$likeAndDislikeCount"] }}},
		{$sort: {likedPercentage: -1}},
	])	
	.limit(5).then((items) => {
		console.log('got top newest ideas');
		return res.json(items);
	});
});

// @route   POST api/items/getTopNewestIdeas/
// @desc    gets the ideas with most likes + dislikes
// @access  Public
router.post('/getTopNewestIdeas/', (req, res) => {
	console.log('getting top newest ideas');
	Item.find().sort({ 'date' : -1 })
	.limit(5)
	.then((items) => {
		console.log('got top newest ideas');
		return res.json(items);
	});
});

// @route   POST api/items/upsertTagsToIdea/
// @desc    update idea
// @access  Public
router.post('/updateIdeaTags/', (req, res) => {
	Item.findOneAndUpdate(
		{ _id: req.body.ideaID },
		{
			$set: {
				tags: req.body.tags
			}
		},
		{ new: true }
	).then((items) => {
		console.log('updated idea tags');
		return res.json(items);
	});
});

// @route   POST api/items/updateIdeaAllFields/
// @desc    update idea
// @access  Public
router.post('/updateIdeaAllFields/', (req, res) => {
	console.log('updating idea: ' + req.body.ideaID);
	console.log('new title: ' + req.body.title);
	console.log('new content: ' + req.body.content);
	console.log('new place: ' + req.body.place);
	console.log('new time: ' + req.body.time);
	console.log('new minNumOfPeople: ' + req.body.minNumOfPeople);
	console.log('new maxNumOfPeople: ' + req.body.maxNumOfPeople);
	Item.findOneAndUpdate(
		{ _id: req.body.ideaID },
		{
			$set: {
				title: req.body.title,
				content: req.body.content,
				tags: req.body.tags,
				place: req.body.place,
				time: req.body.time,
				minNumOfPeople: req.body.minNumOfPeople,
				maxNumOfPeople: req.body.maxNumOfPeople,
			}
		},
		{ new: true }
	).then((items) => {
		console.log('updated idea: ' + req.body.ideaID);
		return res.json(items);
	});
});

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
	Item.find().sort({ date: -1 }).then((items) => res.json(items));
});

module.exports = router;
