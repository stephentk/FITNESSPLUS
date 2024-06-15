import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { Membership } from 'src/modules/membership/membership.model';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        try {
              // Add SSL options if SSL is required
        const sslOptions = config.ssl ? {
            ssl: {
                rejectUnauthorized: false, // You may need to adjust this based on your PostgreSQL server's SSL settings
            },
        } : {};

        const sequelize = new Sequelize({
            ...config,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false, // You may need to adjust this based on your PostgreSQL server's SSL settings
                },
            },
        });

            sequelize.addModels([Membership]); // Add models here
            await sequelize.sync(); // Sync models with database

            return sequelize;
        } catch (error) {
            console.error('Error connecting to PostgreSQL:', error);
            throw new Error('Failed to connect to PostgreSQL');
        }
    },
}];