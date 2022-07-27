const asyncHandler = require('../common/asyncHandler');
const authService = require('../services/authService');

module.exports = {
  auth: asyncHandler(async (req, res) => {
    const { accessToken, refreshToken, UserID, Avatar, FullName } =
      await authService.authorizeById(req.user.UserID);
    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        UserID,
        Avatar,
        FullName,
        success: true,
      });
    }
    res.sendStatus(401);
  }),

  refresh: asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await authService.refresh(
      req.body.refreshToken
    );
    if (accessToken) {
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
      });
    }
    res.sendStatus(401);
  }),

  logout: asyncHandler(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    return res.send({
      success: true,
    });
  }),
};
