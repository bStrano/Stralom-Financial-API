import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvestmentService } from '../services/Investiment.service';
import { CreateInvestmentDto } from '../dto/CreateInvestment.dto';
import { RequestUser } from '../../auth/decorators/request-user.decorator';
import { JWTPayload } from '../../auth/types/JWTPayload';
import { UpdateInvestmentDto } from '../dto/UpdateInvestment.dto';
import { RedeemInvestmentDto } from '../dto/RedeemInvestment.dto';

@Controller('investments')
@ApiTags('Investments')
@UseInterceptors(ClassSerializerInterceptor)
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @ApiBearerAuth()
  create(@RequestUser() user: JWTPayload, @Body() createInvestmentDto: CreateInvestmentDto) {
    return this.investmentService.create(user.userId, createInvestmentDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@RequestUser() user: JWTPayload) {
    return this.investmentService.findAll(user.userId);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.investmentService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentService.update(id, updateInvestmentDto);
  }

  @Patch('/redeem/:id')
  @ApiBearerAuth()
  redeem(@Param('id') id: string, @Body() updateInvestmentDto: RedeemInvestmentDto) {
    return this.investmentService.redeem(id, updateInvestmentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.investmentService.delete(id);
  }
}
