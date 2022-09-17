export interface SeriesBox {
  title: string;
  userid: {
    data: {
      id: number;
      attributes: {
        userid: string;
      };
    };
  };
  post: {
    data: SeriesBoxPost[];
  };
}

export interface SeriesBoxPost {
  id: number;
  attributes: {
    title: string;
    url: string;
  };
}
