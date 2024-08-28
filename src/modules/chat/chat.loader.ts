import { ChatModel, IChatDocument } from "./chat.model";

export async function ChatByIdBatchFunc(ids: readonly string[]) {
  const users = await ChatModel.find({
    _id: {
      $in: ids,
    },
  });
  return ids.map((id: string) => users.find((user: IChatDocument) => user._id?.toString() === id));
}
