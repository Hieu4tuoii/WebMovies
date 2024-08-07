interface server_dataItem {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Server_Data {
  server_data: server_dataItem[];
}
