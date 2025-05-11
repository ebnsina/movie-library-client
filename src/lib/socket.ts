import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "./constants";

export const socket: Socket = io(API_BASE_URL);
