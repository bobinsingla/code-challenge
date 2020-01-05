export class CatalogResponse {
  success: string;
  data: CatalogData;
}

export class CatalogData {
  locations: LocationData[];
}

export class LocationData {
  branches: Branch[];
  dealers_id: string;
  name: string;
  opco: string;
}

export class Branch {
  branch_id: string;
  categories: Category[];
  name: string;
}

export class Category {
  image: string;
  name: string;
  subcategories: SubCategory[];
}

export class SubCategory {
  name: string;
  image: string;
}
