import Url, { IUrl } from "../models/url";

class UrlRepository {
  constructor() {}

  async findAll(): Promise<
    Pick<IUrl, "_id" | "fullUrl" | "shortUrl" | "clicks">[]
  > {
    return await Url.find({}, "_id fullUrl shortUrl clicks");
  }

  async findOne(
    shortUrl: string
  ): Promise<Pick<IUrl, "fullUrl" | "shortUrl" | "clicks"> | null> {
    return await Url.findOne({ shortUrl }, "fullUrl shortUrl clicks");
  }

  async create(url: IUrl): Promise<IUrl> {
    return await Url.create(url);
  }

  async remove(shortUrl: string) {
    return await Url.deleteOne({ shortUrl });
  }
}

export default UrlRepository;
