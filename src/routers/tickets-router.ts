import { Router } from "express";
import { postTicketSchema } from "@/schemas";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(postTicketSchema), postTickets);

export { ticketsRouter };
