const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post');
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/auth');

// Post new post
router.post(
	'/',
	[
		authMiddleware,
		[
			check('text', "Text field can't be empty").notEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors);
		}
		try {
			const user = await User.findById(req.userID).select('-password');
			const newPost = new Post({
				user: req.userID,
				name: user.name,
				text: req.body.text,
				avatar: user.avatar
			});

			await newPost.save();
			res.json(newPost);
		} catch (err) {
			console.error(err.message);
			res.status(500).json('Server error');
		}
	}
);

// Get all posts
router.get('/', authMiddleware, async (req, res) => {
	try {
		// Sort posts by date in descending order(most recent one first)
		const posts = await Post.find().sort('-date');
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Get single post
router.get('/:postid', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postid);
		if (!post) {
			return res.status(404).json('Post not found');
		}
		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json('Post not found');
		}
		res.status(500).json('Server error');
	}
});

// Delete post
router.delete('/:postid', authMiddleware, async (req, res) => {
	try {
		// Model.find() returns a query object
		const post = await Post.findById(req.params.postid);
		// Check if post exists
		if (!post) {
			return res.status(400).json('Post not found');
		}
		// If post exists, check if userID in post matches with request
		if (post.user.toString() !== req.userID) {
			return res.status(401).json('User not authorized to delete this post');
		}

		await post.deleteOne();
		res.json('Post deleted');
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json('Post not found');
		}
		res.status(500).json('Server error');
	}
});

// Update like/unlike
router.put('/like/:postid', authMiddleware, async (req, res) => {
	try {
		// Storing the particular post in variable
		const post = await Post.findById(req.params.postid);
		// Check if post has already been liked by the user
		if (post.likes.filter((item) => item.user.toString() === req.userID).length > 0) {
			// Then unlike post
			const userIndex = post.likes.map((item) => item.user.toString()).indexOf(req.userID);
			post.likes.splice(userIndex, 1);
		} else {
			// If post not liked by the user, then like it
			post.likes.unshift({
				user: req.userID
			});
		}
		await post.save();
		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
