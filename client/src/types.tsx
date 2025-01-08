export type TopicsCard = {
    topic: string;
    image: string;
    link: string;
}

export type MenuTopic = {
    topic: string;
    link: string;
}

export type ThreadTopic = {
    topic: string;
}

export type User = {
    name: string;
    password: string;
    posts: Post[];
    comments: Comment[];
}

export type Post = {
    ID: number;
    topic: string;
    title: string;
    body: string;
    image: string;
    user_id: number;
    user: User;
    comments: Comment[];
}

export type Comment = {
    ID: number;
    body: string;
    post_id: number;
    post: Post;
    user_id: number;
    user: User;
}

export type UserForm = {
    name: string;
    password: string;
}
