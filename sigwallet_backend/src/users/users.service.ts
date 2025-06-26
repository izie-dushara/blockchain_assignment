import { Inject, Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';
import { Database } from 'src/database/types';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly db: Kysely<Database>,
  ) {}

  async findAll() {
    return await this.db.selectFrom('users').selectAll().execute();
  }

  async findById(id: number) {
    return await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async create(user: { email: string; name: string }) {
    return await this.db
      .insertInto('users')
      .values({
        ...user,
        created_at: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(id: number, updates: { email?: string; name?: string }) {
    return await this.db
      .updateTable('users')
      .set(updates)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async delete(id: number) {
    return await this.db.deleteFrom('users').where('id', '=', id).execute();
  }
}
