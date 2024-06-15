import { Injectable, Inject } from '@nestjs/common';
import { Membership } from './membership.model';
import { MEMBERSHIP_REPOSITORY } from 'src/core/constants';
import { MembershipDto } from './membership.dto';
import moment from 'moment';
import { Op } from 'sequelize';
import { MailerService } from './mailer/mailer.service';

@Injectable()
export class MembershipService {

    constructor(@Inject( MEMBERSHIP_REPOSITORY) private readonly membershipRepository: typeof Membership ,
    private readonly mailerService: MailerService) { }

    async create(membership: MembershipDto): Promise<Membership> {
        return await this.membershipRepository.create<Membership>(membership);
    }
   async findAll(filterConditions?: any): Promise<Membership[]> {
    return await this.membershipRepository.findAll<Membership>({
      where: filterConditions, // Pass filter conditions to the `where` option
    });
  }
  async sendMembershipReminders(): Promise<void> {
    try {
      const today = moment().startOf('day').toDate();
      const thirtyDaysLater = moment(today).add(30, 'days').endOf('day').toDate();

      // Query for memberships that match the reminder criteria
      const memberships = await this.membershipRepository.findAll({
        where: {
          membershipType: 'MonthlyBasic', // Example: Filter by membership type
          dueDate: {
            [Op.between]: [today, thirtyDaysLater], // Example: Filter by due date range
          },
        },
      });

      for (const membership of memberships) {
        await this.sendReminderEmail(membership);
      }
    } catch (error) {
      console.error('Error sending membership reminders:', error);
      throw error;
    }
  }

  private async sendReminderEmail(membership: Membership): Promise<void> {
    let emailContent = `
      Dear ${membership.firstName} ${membership.lastName},
      
      Your ${membership.membershipType} membership payment is due soon.
      Amount due: ${membership.totalAmount}
      Due date: ${moment(membership.dueDate).format('YYYY-MM-DD')}
      
      Invoice link: ${membership.invoiceLink}
      
      Best regards,
      Fitness+ Team
    `;

    if (membership.isFirstMonth) {
      emailContent += `
        Please note, this invoice includes charges for your first month's membership.
      `;
    } else {
      emailContent += `
        Please note, this invoice is for the add-on services for the upcoming month.
      `;
    }

    try {
      await this.mailerService.sendMail(membership.email, `Fitness+ Membership Reminder - ${membership.membershipType}`, emailContent);
      console.log(`Reminder email sent to ${membership.email}`);
    } catch (error) {
      console.error(`Error sending reminder email to ${membership.email}:`, error);
      throw error;
    }
  }
}
