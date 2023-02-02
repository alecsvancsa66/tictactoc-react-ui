import { Socket } from "socket.io-client";
import { IStartGame, TBoard } from "../models/room";

class GameService {
  public async JoinRoom(socket: Socket, roomId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      socket.emit("join_game", { roomId });
      socket.on("room_joined", () => resolve(true));
      socket.on("room_join_error", ({ error }) => reject(error));
    });
  }

  public async updateGame(socket: Socket, board: TBoard) {
    socket.emit("update_game", { board });
  }

  public async onGameUpdate(socket: Socket, listener: (board: TBoard) => void) {
    socket.on("on_game_update", ({ board }) => listener(board));
  }

  public async onStartGame(
    socket: Socket,
    listener: (payload: IStartGame) => void
  ) {
    socket.on("start_game", listener);
  }
}

export default new GameService();
