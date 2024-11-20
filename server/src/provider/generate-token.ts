import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined");
}

function generateToken(userId: string) {
	const token = sign({}, JWT_SECRET, {
		subject: userId,
		expiresIn: "10d", //Time in seconds
	});

	return token;
}

export { generateToken };