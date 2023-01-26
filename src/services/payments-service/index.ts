import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository, { CreatePaymentParams } from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findUniqueById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  return await paymentRepository.findByTicketId(ticketId);
}

async function createPayment(body: CreatePaymentParams, userId: number) {
  const ticket = await ticketRepository.findUniqueById(body.ticketId);
  if (!ticket) throw notFoundError();

  const ticketType = await ticketRepository.findTypeById(ticket.ticketTypeId);

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  await ticketRepository.updateTicket(body.ticketId);
  return await paymentRepository.createPayment(body, ticketType.price);
}

const paymentService = {
  getByTicketId,
  createPayment,
};

export default paymentService;
