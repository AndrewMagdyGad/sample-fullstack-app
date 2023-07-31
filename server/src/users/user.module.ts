import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DateScalar } from '../common/scalars/date.scalar';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserResolver, UserService, DateScalar],
  exports: [UserService],
})
export class UserModule {}
