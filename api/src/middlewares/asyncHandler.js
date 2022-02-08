const asyncHandler =
  (fn) =>
  (req, res, next, ...args) => {
    Promise.resolve(fn(req, res, next, ...args))
      .then(next)
      .catch(next);
  };

module.exports = asyncHandler;
