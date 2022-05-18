import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidV4 } from 'uuid';

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public userId: string;

  @column()
  public date: Date;

  @column()
  public time: DateTime;

  @column()
  public tel: string;

  @column()
  public description: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public requested_at: DateTime;

  @column.dateTime()
  public updated_at: DateTime;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
