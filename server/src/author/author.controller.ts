import { Controller } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('api/v1/author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}
}
