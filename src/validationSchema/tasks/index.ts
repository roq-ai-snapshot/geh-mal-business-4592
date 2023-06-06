import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  shell_company_id: yup.string().nullable().required(),
});
