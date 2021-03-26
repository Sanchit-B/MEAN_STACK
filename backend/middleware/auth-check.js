const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken =
    jwt.verify(
      token,
      'this_secret_key_should_be_a_longer_string_text_as_it_is_stored_on_server_for_authentication_purpose'
    );


    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not authenticated!'
    });
  }
}
