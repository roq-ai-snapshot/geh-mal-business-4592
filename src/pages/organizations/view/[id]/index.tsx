import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getOrganizationById } from 'apiSdk/organizations';
import { Error } from 'components/error';
import { OrganizationInterface } from 'interfaces/organization';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteShellCompanyById } from 'apiSdk/shell-companies';

function OrganizationViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrganizationInterface>(
    () => (id ? `/organizations/${id}` : null),
    () =>
      getOrganizationById(id, {
        relations: ['user', 'shell_company'],
      }),
  );

  const shell_companyHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteShellCompanyById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Organization Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Name:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.name}
            </Text>
            <br />
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  User:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/users/view/${data?.user?.id}`}>
                    {data?.user?.email}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('shell_company', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Shell Companies:
                </Text>
                <NextLink passHref href={`/shell-companies/create?organization_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>name</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.shell_company?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.name}</Td>
                          <Td>
                            <NextLink passHref href={`/shell-companies/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/shell-companies/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => shell_companyHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'organization',
  operation: AccessOperationEnum.READ,
})(OrganizationViewPage);
