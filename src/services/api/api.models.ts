export interface SourceDto {
    title: string;
    assignment: string;
}

export interface NewClassDto {
    // UNIX timestamp in seconds
    date: number;
    sources: SourceDto[];
}
