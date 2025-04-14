/**
 * metadata of a page when data is paged
 */
interface PageMeta {

  /**
   * total items number
   */
  total: number;

  /**
   * current page
   */
  page: number;

  /**
   * limit items number per page
   */
  limit: number;

  /**
   * total pages number
   */
  totalPages: number;
}

export default PageMeta
