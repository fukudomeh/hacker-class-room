import { IChatRoom } from "@types";
export interface Props {
  chatRooms: IChatRoom[];
  onOpenClick: (id: string) => void;
}
