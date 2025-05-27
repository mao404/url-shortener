class Success {
  status: string;
  data: unknown;
  constructor(data: unknown) {
    (this.status = "OK"), (this.data = data);
  }
}

export default Success;
