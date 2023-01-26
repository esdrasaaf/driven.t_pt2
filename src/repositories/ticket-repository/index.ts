import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findManyTypes() {
  return prisma.ticketType.findMany();
}

async function findTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

async function findUniqueWithTicketType(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findUniqueByEnrollment(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

async function findUniqueById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function insert(data: CreateTicketParams) {
  return prisma.ticket.create({
    data,
    include: {
      TicketType: true,
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: "PAID",
    },
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  findManyTypes,
  findUniqueByEnrollment,
  findUniqueWithTicketType,
  insert,
  findUniqueById,
  findTypeById,
  updateTicket,
};

export default ticketRepository;
