import { ShellCompanyInterface } from 'interfaces/shell-company';

export interface ServiceInterface {
  id?: string;
  name: string;
  shell_company_id: string;

  shell_company?: ShellCompanyInterface;
  _count?: {};
}
