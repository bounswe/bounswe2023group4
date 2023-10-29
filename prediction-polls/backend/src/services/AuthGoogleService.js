const qs = require("querystring");
const axios = require("axios");


async function googleLogIn(req,res){

    console.log("GOOGLE REQUEST IS RECIEVED")

    const code = req.query.code;
  
    try {
      // get the id and access token with the code
      const { id_token, access_token } = await getGoogleOAuthTokens({ code });
      console.log({ id_token, access_token });
  
      // get user with tokens
      const googleUser = await getGoogleUser({ id_token, access_token });
  
      console.log({ googleUser });
  
      if (!googleUser.verified_email) {
        return res.status(403).send("Google account is not verified");
      }
  
      const user = {name : googleUser.name};
      const accesToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      db.addRefreshToken(refreshToken);
      res.json({accessToken: accesToken, refreshToken: refreshToken})
  
    } catch (error) {
      console.log(error, "Failed to authorize Google user");
      return res.redirect("http://localhost:3000/login");
    }
  }
  
  async function getGoogleOAuthTokens(code){
    const url = "https://oauth2.googleapis.com/token";
  
    const values = {
      code,
      client_id: process.env.googleClientId,
      client_secret: process.env.googleClientSecret,
      redirect_uri: process.env.googleOauthRedirectUrl,
      grant_type: "authorization_code",
    };
  
    //Making the request
    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        qs.stringify(values),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error.response.data.error);
      log.error(error, "Failed to fetch Google Oauth Tokens");
      throw new Error(error.message);
    }
  
  }
  
  async function getGoogleUser({
    id_token,
    access_token,
  }) {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      log.error(error, "Error fetching Google user");
      throw new Error(error.message);
    }
  }



module.exports = {googleLogIn}