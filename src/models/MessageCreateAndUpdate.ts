export interface MessageCreate {
    message: string;
}

export interface MessageUpdate {
    message?: string;
    reactivate?: boolean;
}

export interface MessageFilter {
    message?: string;
    active?: boolean;
}

export interface MessageOutput {
    id: string;
    message: string;
    palindrome: boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    archived_at?: Date;
}