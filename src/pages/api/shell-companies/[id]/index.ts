import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { shellCompanyValidationSchema } from 'validationSchema/shell-companies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shell_company
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getShellCompanyById();
    case 'PUT':
      return updateShellCompanyById();
    case 'DELETE':
      return deleteShellCompanyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShellCompanyById() {
    const data = await prisma.shell_company.findFirst(convertQueryToPrismaUtil(req.query, 'shell_company'));
    return res.status(200).json(data);
  }

  async function updateShellCompanyById() {
    await shellCompanyValidationSchema.validate(req.body);
    const data = await prisma.shell_company.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteShellCompanyById() {
    const data = await prisma.shell_company.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
