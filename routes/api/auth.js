const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/registration",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.registration)
);
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
