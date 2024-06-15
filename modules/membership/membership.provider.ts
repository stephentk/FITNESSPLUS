import { MEMBERSHIP_REPOSITORY } from 'src/core/constants';
import { Membership } from './membership.model';

export const membershipProviders = [{
    provide: MEMBERSHIP_REPOSITORY,
    useValue: Membership,
}];