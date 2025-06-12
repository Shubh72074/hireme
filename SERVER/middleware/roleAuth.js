const adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
}

const employerRole = (req, res, next) => {
  if (req.user.role !== "employer") {
    return res.status(403).send("Access denied.");
  }
  next();
}

const userRole = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).send("Access denied.");
  }
  next();
}

const employerOrAdminRole = (req, res, next) => {
  if (req.user.role !== "employer" && req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
}

const userOrAdminRole = (req, res, next) => {
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(403).send("Access denied.");
  }
  next();
}

module.exports = {
  adminRole,
  employerRole,
  userRole,
  userOrAdminRole,
  employerOrAdminRole,
}