console.log('This is home page');
import { Pagination } from "@/components/pagination";

const container = document.querySelector<HTMLElement>(".pagination-wrapper");

const pagination = new Pagination(container!, 5, 12);

pagination.onPageChange((page, pageSize) => {
  console.log("Make API request here", page, pageSize);
})