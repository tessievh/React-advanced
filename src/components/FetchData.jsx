export const postLoader = async ({ params }) => {
  const post = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    post: await post.json(),
    users: await users.json(),
  };
};

export const postListLoader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch(`http://localhost:3000/users`);

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
  //  return events.json();
};

// export const categoryLoader = async () => {
//   const categories = await fetch("http://localhost:3000/categories");
//   return await categories.json();
// };
