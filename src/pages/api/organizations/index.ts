import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.shell_company?.length > 0) {
      const create_shell_company = body.shell_company;
      body.shell_company = {
        create: create_shell_company,
      };
    } else {
      delete body.shell_company;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
