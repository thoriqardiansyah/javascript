class Config {
   #port = 8080
   #logFormat = ':method :url status=:status content_type=:res[content-type] content_length=:res[content-length] - :response-time ms'
   constructor() {
      this.#port = process.env.PORT ?? this.#port
      this.#logFormat = process.env.LOG_FORMAT ?? this.#logFormat
   }
   port = () => this.#port
   logFormat = () => this.#logFormat
}

module.exports = new Config()