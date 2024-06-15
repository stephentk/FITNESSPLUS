import { Test, TestingModule } from '@nestjs/testing';
import { MembershipService } from './membership.service';
import { getModelToken } from '@nestjs/sequelize';
import { Membership } from './membership.model';
import { MembershipDto } from './membership.dto';

describe('MembershipService', () => {
  let membershipservice: MembershipService;
  let membershipmodel: typeof Membership;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipService,
        {
          provide: getModelToken(Membership),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    membershipservice = module.get<MembershipService>(MembershipService);
    membershipmodel = module.get<typeof Membership>(getModelToken(Membership));
  });

  it('should be defined', () => {
    expect(membershipservice).toBeDefined();
  });

  describe('create', () => {
    it('should create a membership', async () => {
      const membershipDto: MembershipDto = {
        firstName: 'John',
        lastName: 'Doe',
        membershipType: 'AnnualBasic',
        startDate: new Date(),
        dueDate: new Date(),
        totalAmount: 100,
        email: 'test123@example.com',
        isFirstMonth: true,
        invoiceLink: 'http://example.com/invoice/1',
      };

      const createdMembership = {
        ...membershipDto,
        membershipId: 'uuid',
      };

   

      const result = await membershipservice.create(membershipDto);
      expect(result).toEqual(createdMembership);
    });
  });

  describe('findAll', () => {
    it('should return all memberships', async () => {
      const memberships = [
        { firstName: 'John', lastName: 'Doe', membershipType: 'AnnualBasic' },
      ];


      const result = await membershipservice.findAll();
      expect(result).toEqual(memberships);
    });
  });
});
