import { GroupModel, IGroupDocument } from "./group.model";

export async function GroupByIdBatchFunc(ids: readonly string[]) {
  const users = await GroupModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => users.find((user: IGroupDocument) => user._id?.toString() === id));
}
