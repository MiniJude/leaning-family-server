import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreatePermissionDto {
  @IsOptional()
  parentId?: number;
  @IsNotEmpty()
  label: string;
  @IsNotEmpty()
  name: string;
  @IsOptional()
  icon?: string;
  @IsNotEmpty()
  type: number;
  @IsOptional()
  route?: string;
  @IsOptional()
  order: number;
  @IsOptional()
  @ValidateIf((o) => o.type === 1)
  @IsNotEmpty()
  component?: string;
}

export class UpdatePermissionDto {
  @IsNotEmpty()
  id: number;
  @IsOptional()
  parentId?: number;
  @IsOptional()
  label?: string;
  @IsOptional()
  name?: string;
  @IsOptional()
  icon?: string;
  @IsOptional()
  type?: number;
  @IsOptional()
  route?: string;
  @IsOptional()
  order?: number;
  @IsOptional()
  component?: string;
}

export class DeletePermissionDto {
  @IsNotEmpty()
  id: number;
}
