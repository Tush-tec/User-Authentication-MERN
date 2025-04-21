import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get the token from the Authorization header

  if (!token) {
    return res.status(403).json({ msg: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token

    // Check if the role is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied, admin role required' });
    }

    req.user = decoded; // Attach user info to the request object
    next(); // Allow the request to continue
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token', error: err.message });
  }
};
