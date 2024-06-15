import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database./database..module';
import { ConfigModule } from '@nestjs/config';
import { MembershipModule } from './modules/membership/membership.module';
import {MailerModule } from './modules/membership/mailer/mailer.module'

@Module({
  imports: [  ConfigModule.forRoot({ isGlobal: true }),DatabaseModule, MembershipModule,MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
