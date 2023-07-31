const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Ocurrió un error en el servidor";

  res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
