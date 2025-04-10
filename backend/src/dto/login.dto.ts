import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@mail.com', description: 'The username of the user' })
  email: string;

  @ApiProperty({ example: '12345', description: 'The password of the user' })
  password: string;
}
