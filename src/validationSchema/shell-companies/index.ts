import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { serviceValidationSchema } from 'validationSchema/services';
import { softwareValidationSchema } from 'validationSchema/software';
import { taskValidationSchema } from 'validationSchema/tasks';

export const shellCompanyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  feedback: yup.array().of(feedbackValidationSchema),
  service: yup.array().of(serviceValidationSchema),
  software: yup.array().of(softwareValidationSchema),
  task: yup.array().of(taskValidationSchema),
});
