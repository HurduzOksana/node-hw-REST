const { User } = require("../../models/user");

const { RequestError, sendMail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "Bad Request");
  }

  if (user.verify) {
    throw RequestError(400, "Email already verify");
  }

  const mail = {
    to: email,
    subject: "Confirm registration on the site",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to confirm registration</a>`,
  };

  await sendMail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
