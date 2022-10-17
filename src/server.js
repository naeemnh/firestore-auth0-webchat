const express = require("express"),
	cors = require("cors"),
	jwt = require("express-jwt"),
	jwks = require("jwks-rsa"),
	firebaseAdmin = require("firebase-admin"),
	path = require("path");

const app = express();
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
	}),
	audience: process.env.AUTH0_API_AUDIENCE,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithm: "RS256",
});
