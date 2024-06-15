import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    return await this.mailerService.sendMail(to, subject, text);
  }
}
