import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MembershipService } from '../membership.service';

@Controller('email')
export class EmailController {
  constructor(
    private membershipservice: MembershipService) {}

  @Post('send')
  async sendEmail(
  ) {
    return await this.membershipservice.sendMembershipReminders()
  }
}
