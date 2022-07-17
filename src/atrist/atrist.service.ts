import { Injectable } from '@nestjs/common';
import { CreateAtristDto } from './dto/create-atrist.dto';
import { UpdateAtristDto } from './dto/update-atrist.dto';

@Injectable()
export class AtristService {
  create(createAtristDto: CreateAtristDto) {
    return 'This action adds a new atrist';
  }

  findAll() {
    return `This action returns all atrist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} atrist`;
  }

  update(id: number, updateAtristDto: UpdateAtristDto) {
    return `This action updates a #${id} atrist`;
  }

  remove(id: number) {
    return `This action removes a #${id} atrist`;
  }
}
