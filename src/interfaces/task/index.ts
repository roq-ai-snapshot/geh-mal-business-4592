import { UserInterface } from 'interfaces/user';
import { ShellCompanyInterface } from 'interfaces/shell-company';

export interface TaskInterface {
  id?: string;
  name: string;
  description?: string;
  status: string;
  user_id: string;
  shell_company_id: string;

  user?: UserInterface;
  shell_company?: ShellCompanyInterface;
  _count?: {};
}
