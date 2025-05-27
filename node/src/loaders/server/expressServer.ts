import express, { Application, Request, Response, NextFunction } from "express";
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const config = require("../../config").default;
import logger from "../logger";
import AppError from "../../errors/appError";

class ExpressServer {
  private app: Application;
  private port: number;
  private basePathUrl: string;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.basePathUrl = `${config.api.prefix}/url`;

    this._middlewares();
    this._swaggerConfig();

    this._routes();

    this._notFound();
    this._errorHandler();
  }

  private _middlewares(): void {
    this.app.use(express.json());
    //Console log of each request to the API
    this.app.use(morgan("tiny"));
  }

  private _routes(): void {
    //Request to the API to check if it is online
    this.app.head("/status", (req: Request, res: Response) => {
      res.status(200).end();
    });

    this.app.use(this.basePathUrl, require("../../routes/urls").default);
  }

  private _notFound(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const err = new AppError("Not Found");
      err.code = 404;
      next(err);
    });
  }

  private _errorHandler(): void {
    this.app.use(
      (err: AppError, req: Request, res: Response, next: NextFunction) => {
        const code = err.code || 500;

        logger.error(
          `${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        logger.error(err.stack);

        const body = {
          error: {
            code,
            message: err.message,
            detail: err.data,
          },
        };
        res.status(code).json(body);
      }
    );
  }

  //Swagger configuration for the documentation in the route imported from config file
  private _swaggerConfig(): void {
    const swaggerDocument = require("../swagger/swagger.json");
    this.app.use(
      config.swagger.path,
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  async start(): Promise<void> {
    this.app.listen(this.port, (error?: Error) => {
      if (error) {
        logger.error(error);
        process.exit(1);
      }
    });
  }
}

export default ExpressServer;
