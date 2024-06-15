export class MembershipDto {

    firstName: string;
    lastName: string;
    membershipType: 'AnnualBasic' | 'MonthlyPremium';
    startDate: Date;
    dueDate: Date;
    totalAmount: number;
    email: string;
    isFirstMonth: boolean;
    invoiceLink: string;
  
  }
  