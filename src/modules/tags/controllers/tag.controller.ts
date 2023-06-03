import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { TagService } from '../services/tag.service';

@Controller('tags')
@ApiTags('Tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTagDto: CreateTagDto, @RequestUser() user: JWTPayload) {
    return this.tagService.save(createTagDto, user.userId);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@RequestUser() user: JWTPayload) {
    return this.tagService.findAll(user.userId);
  }
}
