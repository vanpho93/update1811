export interface ServerResponse {
    success: boolean;
    [propName: string]: any;
}

export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface Story {
    _id: string;
    content: string;
    author: { name: string };
    fans: User[];
    comments: any[];
}

export interface AppState {
    checked: boolean;
    user: User;
    stories: Story[];
    friends: User[];
    incommingRequests: User[];
    sentRequests: User[];
    otherUsers: User[];
}
