import { Injectable, Inject } from '@nestjs/common';
import { Membership } from './membership.model';
import { MEMBERSHIP_REPOSITORY } from 'src/core/constants';
import { MembershipDto } from './membership.dto';

@Injectable()
export class MembershipService {

    constructor(@Inject( MEMBERSHIP_REPOSITORY) private readonly membershipRepository: typeof Membership ) { }

    async create(membership: MembershipDto): Promise<Membership> {
        return await this.membershipRepository.create<Membership>(membership);
    }
   async findAll(filterConditions?: any): Promise<Membership[]> {
    return await this.membershipRepository.findAll<Membership>({
      where: filterConditions, // Pass filter conditions to the `where` option
    });
  }
}