import { Test, TestingModule } from '@nestjs/testing';
import { CronMembershipService } from './membership.job';
import { MembershipService } from './membership.service';

import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { Membership } from './membership.model';
import { Op } from 'sequelize';
import { MailerService } from './mailer/mailer.service';

describe('CronMembershipService', () => {
  let service: CronMembershipService;
  let membershipService: MembershipService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronMembershipService,
        {
          provide: MembershipService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CronMembershipService>(CronMembershipService);
    membershipService = module.get<MembershipService>(MembershipService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ExistingMembers', () => {
    it('should send reminders for monthly basic memberships due in the next 30 days', async () => {
      const today = moment().startOf('day').toDate();
      const thirtyDaysLater = moment(today).add(30, 'days').endOf('day').toDate();

   
      

      await service.ExistingMembers();

      expect(membershipService.findAll).toHaveBeenCalledWith({
        where: {
          membershipType: 'MonthlyBasic',
          dueDate: {
            [Op.between]: [today, thirtyDaysLater],
          },
        },
      });
  
    });
  });

  describe('NewMembers', () => {
    it('should send first month reminders for new memberships due in 7 days', async () => {
      const today = moment().startOf('day').toDate();
      const sevenDaysAfter = moment(today).add(7, 'days').toDate();


      expect(membershipService.findAll).toHaveBeenCalledWith({
        where: {
          dueDate: {
            [Op.eq]: sevenDaysAfter,
          },
        },
    
    });
  });
});
}
)
