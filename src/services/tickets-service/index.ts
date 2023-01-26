import ticketRepository, { CreateTicketParams } from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

async function getTypes() {
  return await ticketRepository.findManyTypes();
}

async function getByUserId(userId: number) {
  const enrollments = await enrollmentRepository.findByUserId(userId);
  if (!enrollments) throw notFoundError();

  const userTicket = await ticketRepository.findUniqueByEnrollment(enrollments.id);
  if (!userTicket) throw notFoundError();

  return await ticketRepository.findUniqueWithTicketType(enrollments.id);
}

async function createTicket(userId: number, body: { ticketTypeId: number }) {
  const enrollments = await enrollmentRepository.findByUserId(userId);
  if (!enrollments) throw notFoundError();

  const data: CreateTicketParams = {
    ticketTypeId: body.ticketTypeId,
    enrollmentId: enrollments.id,
    status: "RESERVED",
  };

  return await ticketRepository.insert(data);
}

const ticketService = {
  getTypes,
  getByUserId,
  createTicket,
};

export default ticketService;
