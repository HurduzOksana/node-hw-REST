const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { shemas } = require("../../models/contacts");
const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validateBody(shemas.joiContactSchema),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(shemas.joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
