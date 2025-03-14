import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Redeem } from './redeem.entity';
import { RedeemController } from './redeem.controller';
import { RedeemService } from './redeem.service';

@Module({
  imports: [TypeOrmModule.forFeature([Redeem]), forwardRef(() => UserModule)],
  controllers: [RedeemController],
  providers: [RedeemService],
  exports: [RedeemService],
})
export class RedeemModule {}
