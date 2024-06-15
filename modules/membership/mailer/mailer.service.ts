import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';



@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:process.env.SMTPHOST, 
      port: 587, 
      secure: false,
      auth: {
        user: process.env.SENDEREMAIL, 
        pass: process.env.SENDERPASSWORD, 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      to,
      subject,
      text,
   
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
