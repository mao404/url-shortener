import UrlRepository from "../repositories/urls";
import { IUrl } from "../models/url";
const repository = new UrlRepository();

const findAll = async (): Promise<
  Pick<IUrl, "_id" | "fullUrl" | "shortUrl" | "clicks">[]
> => {
  return await repository.findAll();
};

const findOne = async (
  shortUrl: string
): Promise<Pick<IUrl, "fullUrl" | "shortUrl" | "clicks"> | null> => {
  return await repository.findOne(shortUrl);
};

const incrementClicks = async (
  shortUrl: string
): Promise<Pick<IUrl, "fullUrl" | "shortUrl" | "clicks"> | null> => {
  return await repository.incrementClicks(shortUrl);
};

const save = async (url: IUrl): Promise<IUrl> => {
  return await repository.create(url);
};

const remove = async (shortUrl: string) => {
  return await repository.remove(shortUrl);
};

export default {
  findAll,
  findOne,
  incrementClicks,
  save,
  remove,
};
