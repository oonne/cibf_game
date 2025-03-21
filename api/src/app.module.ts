import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './common/guard/auth.guard';
import { RoleGuard } from './common/guard/role.guard';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { JwtModule } from './module/jwt/jwt.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';
import { StaffModule } from './module/staff/staff.module';
import { StaffController } from './module/staff/staff.controller';
import { RecycleModule } from './module/recycle/recycle.module';
import { RecycleController } from './module/recycle/recycle.controller';
import { SettingModule } from './module/setting/setting.module';
import { SettingController } from './module/setting/setting.controller';
import { UserModule } from './module/user/user.module';
import { UserController } from './module/user/user.controller';
import { RedeemModule } from './module/redeem/redeem.module';
import { RedeemController } from './module/redeem/redeem.controller';

@Module({
  providers: [
    // 日志
    Logger,
    // 鉴权守卫
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // 角色校验守卫
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  imports: [
    // 全局环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.ENV}`, '.env'],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    // JWT
    JwtModule,
    // 子模块
    AuthModule,
    StaffModule,
    RecycleModule,
    SettingModule,
    UserModule,
    RedeemModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
    consumer.apply(LoggerMiddleware).forRoutes(StaffController);
    consumer.apply(LoggerMiddleware).forRoutes(RecycleController);
    consumer.apply(LoggerMiddleware).forRoutes(SettingController);
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
    consumer.apply(LoggerMiddleware).forRoutes(RedeemController);
  }
}
