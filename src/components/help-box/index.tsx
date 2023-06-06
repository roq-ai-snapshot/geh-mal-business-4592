import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Business Owner', 'Business Staff', 'Admin', 'Customer'];
  const applicationName = 'Geh mal Business holn';
  const tenantName = 'Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Business Owner

1. As a business owner, I want to be able to create a new shell company within an hour, so that I can quickly start my new venture without any delays.
2. As a business owner, I want to have access to all the required software and services for my shell company, so that I can manage my business efficiently.
3. As a business owner, I want to be able to add and manage my business staff, so that I can delegate tasks and responsibilities to them.
4. As a business owner, I want to have access to a support network, so that I can get help and advice when needed.
5. As a business owner, I want to be able to manage multiple shell companies within the platform, so that I can keep track of all my businesses in one place.

Role: Business Staff

1. As a business staff member, I want to be able to access the software and services provided by the platform, so that I can perform my job efficiently.
2. As a business staff member, I want to be able to collaborate with my colleagues, so that we can work together on projects and tasks.
3. As a business staff member, I want to have access to the support network, so that I can get help and advice when needed.
4. As a business staff member, I want to be able to view and update my tasks and responsibilities, so that I can stay organized and on track.

Role: Admin

1. As an admin, I want to be able to manage the users within the organization, so that I can ensure the right people have access to the platform.
2. As an admin, I want to be able to manage the software and services provided by the platform, so that I can ensure they are up-to-date and functioning properly.
3. As an admin, I want to be able to monitor the usage of the platform, so that I can identify any potential issues or areas for improvement.
4. As an admin, I want to have access to the support network, so that I can get help and advice when needed.

Role: Customer

1. As a customer, I want to be able to easily find and contact the shell company, so that I can inquire about their products or services.
2. As a customer, I want to be able to access any customer-facing software or services provided by the shell company, so that I can interact with the business efficiently.
3. As a customer, I want to be able to provide feedback on my experience with the shell company, so that they can improve their offerings and customer service.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
