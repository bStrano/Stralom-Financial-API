import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../entities/tag.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(@InjectRepository(Tag) private repository: Repository<Tag>) {}

  save(createDto: CreateTagDto, userId: number) {
    return this.repository.save({ ...createDto, userId });
  }

  findAllByUser(userId: number) {
    return this.repository.find({ where: { userId } });
  }
}
