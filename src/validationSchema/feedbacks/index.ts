import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comment: yup.string(),
  customer_id: yup.string().nullable().required(),
  shell_company_id: yup.string().nullable().required(),
});
