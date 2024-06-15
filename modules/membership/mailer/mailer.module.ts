import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EmailController } from './mailer.controller';
import { MembershipService } from '../membership.service';
import { membershipProviders } from '../membership.provider';


@Module({
  providers: [MailerService,MembershipService,...membershipProviders],
  controllers: [EmailController],
  exports: [MailerService],
})
export class MailerModule {}
