import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { MembershipDto } from './membership.dto';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
    constructor(private membershipservice: MembershipService) {}

    
    @Post('create')
    async createMembership(@Body() membership: MembershipDto) {
        return await this.membershipservice.create(membership);
    }
}