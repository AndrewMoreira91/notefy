import { AxiosError } from "axios";

type MessageError = string;

function errorHandler(error: Error): MessageError {
	if (error instanceof AxiosError) {
		if (error.code === "ERR_NETWORK") {
			console.error("Erro ao conectar com o servidor");
			return "Erro ao conectar com o servidor";
		}

		return error.response?.data.message;
	}
	return "Um erro inesperado ocorreu";
}

export default errorHandler;