export interface Database {
  users: {
    id: number | null;
    email: string;
    name: string;
    created_at: Date;
  };
  //   posts: {
  //     id: number;
  //     title: string;
  //     content: string;
  //     user_id: number;
  //     created_at: Date;
  //   };
}
