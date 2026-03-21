export interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
  badge?: string;
  external?: boolean;
}

export interface ScribeConfig {
  name: string;
  description: string;
  url: string;

  logo?: {
    light?: string;
    dark?: string;
    text?: string;
  };

  theme?: {
    primaryColor?: string;
    font?: string;
    monoFont?: string;
    radius?: string;
  };

  navigation: NavItem[];

  topNav?: Array<{
    href: string;
    label: string;
    external?: boolean;
  }>;

  actions?: {
    primaryButton?: { label: string; href: string };
    secondaryButton?: { label: string; href: string };
  };

  search?: {
    enabled?: boolean;
    shortcut?: string;
  };

  versions?: string[];

  footer?: {
    links?: Array<{ title: string; href: string }>;
    copyright?: string;
  };

  seo?: {
    titleTemplate?: string;
    ogImage?: string;
  };
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  section: string;
  type: "page" | "endpoint" | "error";
  keywords: string[];
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path?: string;
  errorCode?: string;
}
