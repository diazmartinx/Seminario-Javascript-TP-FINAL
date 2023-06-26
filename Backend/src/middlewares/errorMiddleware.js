const errorMiddleware = (err, req, res, next) => {
  // Determinar el código de estado y el mensaje de error según el tipo de error
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Ocurrió un error en el servidor";

  // Enviar una respuesta de error al cliente
  res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
