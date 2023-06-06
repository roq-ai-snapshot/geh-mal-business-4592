import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createService } from 'apiSdk/services';
import { Error } from 'components/error';
import { serviceValidationSchema } from 'validationSchema/services';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ShellCompanyInterface } from 'interfaces/shell-company';
import { getShellCompanies } from 'apiSdk/shell-companies';
import { ServiceInterface } from 'interfaces/service';

function ServiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ServiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createService(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ServiceInterface>({
    initialValues: {
      name: '',
      shell_company_id: (router.query.shell_company_id as string) ?? null,
    },
    validationSchema: serviceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Service
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<ShellCompanyInterface>
            formik={formik}
            name={'shell_company_id'}
            label={'Select Shell Company'}
            placeholder={'Select Shell Company'}
            fetcher={getShellCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'service',
  operation: AccessOperationEnum.CREATE,
})(ServiceCreatePage);
