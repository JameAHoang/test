const { google } = require("googleapis");
const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/service-account.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

module.exports = authenticateGoogle;
