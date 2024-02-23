const asyncHandler =
  (fn) =>
  (req, res, next, ...args) => {
    Promise.resolve(fn(req, res, next, ...args))
      .then(() => next())
      .catch(next);
  };

export default asyncHandler;
