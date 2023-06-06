import { UserInterface } from 'interfaces/user';
import { ShellCompanyInterface } from 'interfaces/shell-company';

export interface FeedbackInterface {
  id?: string;
  rating: number;
  comment?: string;
  customer_id: string;
  shell_company_id: string;

  user?: UserInterface;
  shell_company?: ShellCompanyInterface;
  _count?: {};
}
