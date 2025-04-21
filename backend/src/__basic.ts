export class INA_Error extends Error {
    type: string;
    identifier: string;

    constructor(type: string, identifier: string, message: string = "") {
        super(message);
        this.type = type;
        this.identifier = identifier;
        this.name = "APIError";
    }
}

export class DBError extends INA_Error {
    constructor(identifier: string, message: string = "") {
        super("DATABASE_ERROR", identifier, message);
        this.name = "DBError";
    }
}

export class APIError extends INA_Error {
    constructor(identifier: string, message: string = "") {
        super("API_ERROR", identifier, message);
        this.name = "APIError";
    }
}