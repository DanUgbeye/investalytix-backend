import SERVER_CONFIG from "../../config/server-config";
import { AccessTokenUtility } from "./variants";
import { DeleteAccountTokenUtility } from "./variants";
import { ForgotPasswordTokenUtility } from "./variants";
import { RefreshTokenUtility } from "./variants";
import { VerifyEmailTokenUtility } from "./variants";

const accessTokenUtil = new AccessTokenUtility(
  SERVER_CONFIG.ACCESS_TOKEN_SECRET
);
const refreshTokenUtil = new RefreshTokenUtility(
  SERVER_CONFIG.REFRESH_TOKEN_SECRET
);
const forgotPasswordTokenUtil = new ForgotPasswordTokenUtility(
  SERVER_CONFIG.ACCESS_TOKEN_SECRET
);
const deleteAccountTokenUtil = new DeleteAccountTokenUtility(
  SERVER_CONFIG.ACCESS_TOKEN_SECRET
);
const verifyEmailTokenUtil = new VerifyEmailTokenUtility(
  SERVER_CONFIG.ACCESS_TOKEN_SECRET
);

export {
  accessTokenUtil,
  refreshTokenUtil,
  forgotPasswordTokenUtil,
  deleteAccountTokenUtil,
  verifyEmailTokenUtil,
};
