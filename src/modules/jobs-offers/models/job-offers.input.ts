// src/modules/job-offers/dto/get-job-offers.dto.ts
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Min,
} from 'class-validator';

export class JobOffersInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  remote?: boolean;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minSalary?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxSalary?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsDateString()
  postedAfter?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  page = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit = 10;

  @IsOptional()
  @IsIn(['postedDate', 'salary', 'title'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
