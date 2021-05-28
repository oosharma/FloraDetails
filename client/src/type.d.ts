type FilterOption = string;

type AuthItem = {
  token: String | null,
      isAuthorized: boolean,
      isLoading: boolean,
      user: object
}

type FilterState = {
  filterOptions: FilterOption[];
};

type AuthState = {
  token: String | null,
  isAuthorized: boolean,
  isLoading: boolean,
  user: object
};

type FilterAction = {
  type: string;
  filterId: FilterOption;
};

type AuthAction = {
  type: string;
  auth: AuthItem;
};

type DispatchType = (args: ArticleAction) => ArticleAction;
