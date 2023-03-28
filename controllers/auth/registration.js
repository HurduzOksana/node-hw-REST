const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: result.email,
    password: result.password,
    subscription: result.subscription,
    verificationToken: result.verificationToken,
  });
};

module.exports = registration;
