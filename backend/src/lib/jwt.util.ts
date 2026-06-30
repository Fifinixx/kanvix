import * as jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env
  .ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"];

export function GenerateAccessToken(id:string): string {
  if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY)
    throw new Error("Access token details are missing");
  return jwt.sign({id}, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}



/*
REFRESH and ACCESS token flow

A user logs in, generates an access token and a refresh token. 
The access token will be a jwt and stateless but 
the refresh token will be an opaque string and will be 
stored in the db after hashing(important) for quick lookup.

The refresh token stored in the db will also have a expiredAt field along with
any other fields you want to have. This is used to check if the cookie coming
from the user is valid or not. It maybe hijacked, and an old, expired cookie could be sent.
The access token and refresh token both are set as http only cookie
in the browser. When setting the cookies the paths are also set,
 which basically means you specify which endpoints accepts which cookie.
 When the access token expires, the server returns
401, then your app intercepts this and
 /auth/refresh endpoint is hit (or whatever you have configured),
 The server then hashes the received opaque string


*/
