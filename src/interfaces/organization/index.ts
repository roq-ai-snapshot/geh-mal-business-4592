import { ShellCompanyInterface } from 'interfaces/shell-company';
import { UserInterface } from 'interfaces/user';

export interface OrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  shell_company?: ShellCompanyInterface[];
  user?: UserInterface;
  _count?: {
    shell_company?: number;
  };
}
