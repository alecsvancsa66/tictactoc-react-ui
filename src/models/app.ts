export type StatusType = "idle" | "loading" | "failed";

export interface IAppState {
  status: StatusType;
  error?: string;
}
