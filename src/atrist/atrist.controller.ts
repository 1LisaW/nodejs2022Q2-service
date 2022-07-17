import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtristService } from './atrist.service';
import { CreateAtristDto } from './dto/create-atrist.dto';
import { UpdateAtristDto } from './dto/update-atrist.dto';

@Controller('atrist')
export class AtristController {
  constructor(private readonly atristService: AtristService) {}

  @Post()
  create(@Body() createAtristDto: CreateAtristDto) {
    return this.atristService.create(createAtristDto);
  }

  @Get()
  findAll() {
    return this.atristService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atristService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAtristDto: UpdateAtristDto) {
    return this.atristService.update(+id, updateAtristDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atristService.remove(+id);
  }
}
