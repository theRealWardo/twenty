import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunityScript {
  @Field(() => Boolean)
  success: boolean;
}
