import ShortUniqueId from "short-unique-id";
import { Request, Response, NextFunction } from "express";
import urlService from "../services/urlService";
import Success from "../handlers/successHandler";
import { getAsync, setAsync, delAsync } from "../loaders/redis/redis";

const uid = new ShortUniqueId({ length: 10 });

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cachedData = await getAsync("urls");
    if (cachedData) {
      res.status(200).json(new Success(JSON.parse(cachedData)));
    } else {
      const url = await urlService.findAll();
      await setAsync("urls", JSON.stringify(url));
      res.status(200).json(new Success(url));
    }
  } catch (err) {
    next(err);
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { shortUrl } = req.params;
    const url = await urlService.incrementClicks(shortUrl);

    if (!url) {
      res.status(404).json({ message: "URL not found" });
      return;
    }

    res.status(200).json(new Success(url));
    return;
  } catch (err) {
    next(err);
  }
};

export const createUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const urlData = {
      ...req.body,
      shortUrl: uid.rnd(),
    };
    const url = await urlService.save(urlData);
    await delAsync("urls");
    res.status(201).json(new Success(url));
  } catch (err) {
    next(err);
  }
};

export const removeUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { shortUrl } = req.params;
    let url = await urlService.remove(shortUrl);
    await delAsync("urls");
    res.status(200).json(new Success(url));
  } catch (err) {
    next(err);
  }
};
