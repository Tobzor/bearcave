export type Type = "toast" | "banner" | "dialog";
export type Priority = "low" | "medium" | "high";

export type Request = {
    id?: string;
    type: Type;
    priority?: Priority;
    title: string;
    body?: string;
    cancelLabel?: string;
    confirmLabel?: string;
};

export type Response = {
    dismissed: boolean;
    confirmed: boolean;
    cancelled: boolean;
};

export type Notification = {
    id: string;
    request: Request;
    response: Response | null;
    presented: Date;
    responded: Date | null;
    timeout: number | null;
};

export type Resolver = (response: Response) => void;
export type Presenter = (
    notification: Request,
    resolve: Resolver,
    signal: AbortSignal,
) => void;

export type PresenterRegistration = {
    type: Type;
    present: Presenter;
};
