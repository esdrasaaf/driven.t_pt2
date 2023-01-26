import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment, postPayments } from "@/controllers";
import { postPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(postPaymentSchema), postPayments);

export { paymentsRouter };
