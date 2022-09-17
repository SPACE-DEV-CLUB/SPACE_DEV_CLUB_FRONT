export const postInit = {
  title: "",
  contents: "",
  url: "",
  likeposts: {
    data: [],
  },
  private: false,
  comments: {
    data: [
      {
        id: 0,
        attributes: {
          userid: 0,
          postid: 0,
          content: "",
          createdAt: "",
          depth: 0,
          order: 0,
          group: 0,
          is_deleted: false,
        },
      },
    ],
  },
  userid: {
    data: {
      id: 0,
      attributes: {
        userid: "",
      },
    },
  },
  createdAt: "",
  hashtags: {
    data: [
      {
        id: 0,
        attributes: {
          name: "",
          createdAt: "",
          description: "",
          image: "",
        },
      },
    ],
  },
  photos: {
    data: [
      {
        id: 0,
        attributes: {
          src: "",
        },
      },
    ],
  },
};
