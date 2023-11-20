interface RankItem {
  id: any;
  title: any;
  link: any;
  heat: any;
}

interface Rank {
  id: string;
  name: string;
  data: RankItem[];
  source: string;
  refresh: boolean;
  url: string;
  isLoadData: boolean;
  desc?: string;
}
