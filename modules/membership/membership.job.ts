import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { Membership } from './membership.model';
import moment from 'moment';
import { Op } from 'sequelize';
import * as nodemailer from 'nodemailer';
import { MailerService } from './mailer/mailer.service';
import { MembershipService } from './membership.service';
;

@Injectable()
export class CronMembershipService {
  private readonly from: string;

  constructor(
    private readonly configService: ConfigService,
    private membershipservice: MembershipService,
    private readonly mailerService: MailerService
  ) {}


//cron job runs every 6 hours
  @Cron('0 */4 * * *')
 async ExistingMembers() {
        const today = moment().startOf('day').toDate();
        const thirtyDaysLater = moment(today).add(30, 'days').endOf('day').toDate();
    
        // Query for Monthly Basic memberships with due dates within the next 30 days
        const memberships = await this.membershipservice.findAll({
          where: {
            membershipType: 'MonthlyBasic', // Filter by membership type
            dueDate: {
              [Op.between]: [today, thirtyDaysLater],
            },
          },
        });
    
        for (const membership of memberships) {
          await this.sendMonthlyReminder(membership);
        }
      }

    
      private async sendMonthlyReminder(membership: Membership) {
        const emailContent = `
          Dear ${membership.firstName} ${membership.lastName},
          
          Your Monthly Basic membership fee is due soon.
          Monthly amount due: ${membership.totalAmount}
          Due date: ${moment(membership.dueDate).format('YYYY-MM-DD')}
          
          Invoice link: ${membership.invoiceLink }
          
          Best regards,
          Fitness+ Team
        `;
    
        await this.mailerService.sendMail(
          membership.email,
          `Fitness+ Monthly Basic Membership Reminder`,
          emailContent
        );
      }
  //cron job runs every 6 hours
      @Cron('0 */4 * * *')
      async NewMembers() {
        const today = moment().startOf('day').toDate();
        const sevenDaysAfter = moment(today).add(7, 'days').toDate();
        
        // Query for memberships with due dates 7 days after today
        const memberships = await this.membershipservice.findAll({
          where: {
            dueDate: {
              [Op.eq]: sevenDaysAfter, // Find due dates equal to sevenDaysAfter
            },
          },
        });
        
    
        for (const membership of memberships) {
            //check if its the firstMonth
          if (membership.isFirstMonth) {
            await this.sendFirstMonthReminder(membership);
          } 
        }
      }
    
      private async sendFirstMonthReminder(membership: Membership) {
        const totalAmount = membership.totalAmount 
        const emailContent = `
          Dear ${membership.firstName} ${membership.lastName},
          
          Your ${membership.membershipType} membership is due soon.
          Total amount due: ${totalAmount}
          Due date: ${moment(membership.dueDate).format('YYYY-MM-DD')}
          
          Invoice link: ${membership.invoiceLink || 'No link available'}
          
          Best regards,
          Fitness+ Team
        `;
    
        await this.mailerService.sendMail(
          membership.email,
          `Fitness+ Membership Reminder - ${membership.membershipType}`,
          emailContent
        );
      }
      
     
 
  }

 