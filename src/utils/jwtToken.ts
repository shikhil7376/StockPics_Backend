import jwt from "jsonwebtoken";

export async function generateJwtToken(id: string) {
  try {
    const KEY = process.env.JWT_SECRET_KEY;
    if (!KEY) {
      throw new Error(
        "JWT secret key is not defined in the environment variables."
      );
    }
    const payload = {
      user_id: id,
      exp: Math.floor(Date.now() / 1000) + 12121,
      iat: Math.floor(Date.now() / 1000),
    };
    return jwt.sign(payload, KEY);
  } catch (error) {
    console.log(error);
  }
}

export async function verifyJwt(
  token: string
): Promise<object | string | null> {
  try {
    const KEY = process.env.JWT_SECRET_KEY;
    if (!KEY) {
      throw new Error(
        "JWT secret key is not defined in the environment variables."
      );
    }
    if (!token.startsWith("Bearer ")) {
      throw new Error(
        "Invalid token format. Expected 'Bearer <token>' format."
      );
    }
    const actualToken = token.slice(7).trim(); // Trim to remove any accidental spaces
    return jwt.verify(actualToken, KEY);
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
}
