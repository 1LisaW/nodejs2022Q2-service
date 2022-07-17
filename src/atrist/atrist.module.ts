import { Module } from '@nestjs/common';
import { AtristService } from './atrist.service';
import { AtristController } from './atrist.controller';

@Module({
  controllers: [AtristController],
  providers: [AtristService]
})
export class AtristModule {}
