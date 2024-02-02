import { z } from "zod";
import { USER_ROLES } from "../user/user.types";

export const userRoleSchema = z.enum([USER_ROLES.ADMIN, USER_ROLES.USER]);

export const UserAuthPayloadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
