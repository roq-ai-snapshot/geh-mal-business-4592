import { FeedbackInterface } from 'interfaces/feedback';
import { ServiceInterface } from 'interfaces/service';
import { SoftwareInterface } from 'interfaces/software';
import { TaskInterface } from 'interfaces/task';
import { OrganizationInterface } from 'interfaces/organization';

export interface ShellCompanyInterface {
  id?: string;
  name: string;
  organization_id: string;
  feedback?: FeedbackInterface[];
  service?: ServiceInterface[];
  software?: SoftwareInterface[];
  task?: TaskInterface[];
  organization?: OrganizationInterface;
  _count?: {
    feedback?: number;
    service?: number;
    software?: number;
    task?: number;
  };
}
