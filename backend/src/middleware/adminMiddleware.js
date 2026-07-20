export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    console.log("DEBUG - Access denied. User is not admin. User object:", req.user);
    res.status(403).json({ error: "Access denied. Admins only." });
  }
};