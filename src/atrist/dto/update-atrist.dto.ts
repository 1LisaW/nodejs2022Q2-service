import { PartialType } from '@nestjs/mapped-types';
import { CreateAtristDto } from './create-atrist.dto';

export class UpdateAtristDto extends PartialType(CreateAtristDto) {}
