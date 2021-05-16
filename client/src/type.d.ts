type FilterOption = string;

type FilterState = {
  filterOptions: FilterOption[];
};

type FilterAction = {
  type: string;
  filterId: FilterOption;
};

type DispatchType = (args: ArticleAction) => ArticleAction;
