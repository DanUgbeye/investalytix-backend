export type RequestValidationSchema = {
  body?: Zod.Schema;
  query?: Zod.Schema;
  params?: Zod.Schema;
};
