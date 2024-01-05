const User = require('../models/user.model')
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
	const { name, email, password } = req.body;

	if (!email || !password || !name) {
		res.status(400);
		throw new Error("Please Enter all the fields");
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already Exists");
	}

	const user = await User.create({
		email,
		name,
		password,
	});

	if (user) {
		res.status(201).json({
			userID: user._id,
			name: user.name,
			email: user.email,
			token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "30d",
			}),
		});
	} else {
		res.status(400);
		throw new Error("Failed to create a user");
	}
}

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.status(200);
		res.json({
			userID: user._id,
			email: user.email,
			token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "30d",
			}),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
};

module.exports = {
	login,
	signup,
};
