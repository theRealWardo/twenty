import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuickAction {
  @Field(() => String)
  label: string;

  @Field(() => String)
  icon: string;

  @Field(() => String)
  objectNameSingular: string;

  @Field(() => String)
  name: string;
}
