import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

export function authenticateTokenMidleware(req, res, next) {
  const endPoint = req.originalUrl;

  const publicEndpoints = ['/users/authenticate', '/users/register'];
  const isPublicEndpoint = publicEndpoints.some((p) => p === endPoint);
  if (isPublicEndpoint) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const cache = req.headers['cache'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  // VALIDANDO UN TOKEN
  verify(token, process.env.SALT_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    req.cacheFavorites = JSON.parse(cache).favorites;

    next();
  });
}

export function generateToken(user) {
  // GENERANDO UN TOKEN POR UN DIA COMPLETO
  try {
    return sign(user, process.env.SALT_TOKEN, { expiresIn: '86400s' });
  } catch (error) {
    console.error(error);
  }
}
