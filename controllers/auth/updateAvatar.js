const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");
const path = require("path");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const resizeFile = await Jimp.read(resultUpload);
  await resizeFile.resize(250, 250).write(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
