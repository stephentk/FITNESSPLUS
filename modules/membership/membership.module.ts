import { Module } from '@nestjs/common';
import { membershipProviders } from './membership.provider';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { CronMembershipService } from './membership.job';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Membership } from './membership.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    providers: [ MembershipService ,...membershipProviders,CronMembershipService, MailerService ],
    exports: [MembershipService],
   imports: [
        MailerModule,
        ScheduleModule.forRoot(),
      ],
      
    
    controllers: [MembershipController],
})
export class MembershipModule {}
