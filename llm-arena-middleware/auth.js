const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;
  console.log('token:', JSON.stringify(token));
  console.log('JWT_SECRET:', process.env.JWT_SECRET);


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
