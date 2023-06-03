import { TagRepository } from '../repositories/tag.repository';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private readonly repository: TagRepository) {}

  save(createTagDto: CreateTagDto, userId: number) {
    return this.repository.save(createTagDto, userId);
  }

  findAll(userId: number) {
    return this.repository.findAllByUser(userId);
  }
}
