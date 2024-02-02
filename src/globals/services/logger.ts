export class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

const logger = new LoggerService();
export default logger;
