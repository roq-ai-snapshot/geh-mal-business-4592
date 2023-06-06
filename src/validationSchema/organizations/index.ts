import * as yup from 'yup';
import { shellCompanyValidationSchema } from 'validationSchema/shell-companies';

export const organizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  shell_company: yup.array().of(shellCompanyValidationSchema),
});
