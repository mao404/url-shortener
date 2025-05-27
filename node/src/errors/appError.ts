class AppError extends Error {
  public code: number;
  public data?: unknown;

  constructor(message: string, code: number = 500, data?: unknown) {
    super(message);
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
