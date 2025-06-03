import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options';
import { EVENT_STORE_CONNECTION } from './core-constants';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27019/vf-event-store', {
            connectionName: EVENT_STORE_CONNECTION,
            directConnection: true
        })
    ]
})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions) {
        const imports = options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5434,
                username: 'postgres',
                password: 'pass123',
                autoLoadEntities: true,
                synchronize: true
            }),
            MongooseModule.forRoot('mongodb://localhost:27018/vf-read-db'),
        ]
        : [];
        
        return {
            module: CoreModule,
            imports,
        }
    }
}
