export interface NewsCardType {
  id: number;
  image: string;
  source: string;
  title: string;
  url: string;
  date: string;
  altImage: string;
}

export interface NewsFeedPropsTypes {
  setResult: (arg0: NewsCardType[]) => void;
  setBannerArticle: (arg0: NewsCardType) => void;
  showFilter: boolean;
}

export interface Inputs {
  category: string;
  source: string;
}

export interface NewsFeedInputs {
  keyword: string;
  date: Date;
  category: string;
  source: string;
}

export interface CategoryType {
  value: string;
  label: string;
}
