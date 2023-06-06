import * as yup from 'yup';

export const softwareValidationSchema = yup.object().shape({
  name: yup.string().required(),
  shell_company_id: yup.string().nullable().required(),
});
