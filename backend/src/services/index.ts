export enum Statuses {
  "OK" = 200,
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "PERMISSION_DENIED" = 403,
  "NOT_FOUND" = 404,
}

export type ServiceMethodResult<R> = {
  status: Statuses;
  msg?: string;
  result?: R;
}
