import Joi from "joi";

export const postTicketSchema = Joi.object({
  ticketTypeId: Joi.number().required()
});
