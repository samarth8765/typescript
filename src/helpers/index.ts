import crypto from "crypto";
import "dotenv/config";

const SECRET: string = process.env.SECRET || "SOME_EMPTY_KEY";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (
  salt: string | undefined | null,
  password: string
) => {
  return crypto
    .createHmac("sha-256", SECRET)
    .update([salt, password].join("/"))
    .digest("hex");
};
