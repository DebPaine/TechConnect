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

// Update likes
router.put('/like/:postid', authMiddleware, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postid);

		// Check if post has already been liked by the user
		if (post.likes.filter((like) => like.user.toString() === req.userID).length > 0) {
			return res.status(400).json('Post has already been liked');
		}
		// If post not liked by the user
		post.likes.unshift({
			user: req.userID
		});

		await post.save();
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

// Delete posts
router.delete('/:postid', authMiddleware, async (req, res) => {
	try {
		// Model.find() returns a query object (post in this case)
		const post = await Post.findById(req.params.postid);

		if (!post) {
			return res.status(400).json('Post not found');
		}

		if (post.user.toString() !== req.userID) {
			return res.status(400).json('User not authorized to delete this post');
		}

		await post.deleteOne();
		res.json('Post deleted');
	} catch (err) {
		console.error(err.message);
		res.status(500).json('Server error');
	}
});

module.exports = router;
