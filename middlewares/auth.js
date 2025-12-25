const jwt = require('jsonwebtoken');

exports.isLoggedin = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) return res.clearCookie('token').status(401).json({ message: 'No token found' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (e) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

exports.isAdmin = (req, res, next) => {
	try {
		if (!req.user || req.user.role !== 'admin') {
			return res.status(403).json({
				message: 'Access denied: Admins only',
			});
		}

		next();
	} catch (err) {
		console.log(err);
		return res.status(401).json({
			message: 'Unauthorized',
		});
	}
};
