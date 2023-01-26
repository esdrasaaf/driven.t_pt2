import { prisma } from "@/config";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(body: CreatePaymentParams, value: number) {
  return prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: body.cardData.number.slice(-4),
      value,
    },
  });
}

export type CreatePaymentParams = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: string;
    cvv: string;
  };
};

const paymentRepository = {
  findByTicketId,
  createPayment,
};

export default paymentRepository;
