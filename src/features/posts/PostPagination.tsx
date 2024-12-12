import Button from "@/components/elements/Button";
import { PostType } from "@/lib/types/PostType";
import Link from "next/link";

type PaginationProps = {
search?:string,  
page:number, 
searchedPosts:PostType[] 
}

const Pagination = ({search, page, searchedPosts}:PaginationProps) => {

  const pageNumbers=[]
  const offsetNumber = 3
  for (let i = page-offsetNumber; i<= page+offsetNumber; i++){
    if(i>=1 && i<= Math.ceil(searchedPosts.length / 4) ){
      pageNumbers.push(i)
    }
  }

  return (
    <div className="flex justify-center items-center gap-3">
      <Button type="button" variant={page ===1 ? "disabled":"default"}><Link
        href={{
          pathname: "/postslist",
          query: {
            ...(search ? { search } : {}),
            page: page > 1 ? page - 1 : 1,
          },
        }} 	
      >
        Back
      </Link></Button>
      {pageNumbers.map((number, i) => (
        <Link key={i} 
        href={{
          pathname: "/postslist",
          query: {
            ...(search ? { search } : {}),
            page: number,
          },
        }} 	
      >
        {number}
      </Link>
      ))}
      <Button type="button" variant={page === Math.ceil(searchedPosts.length / 4) ? "disabled":"default"}><Link
        href={{
          pathname: "/postslist",
          query: {
            ...(search ? { search } : {}),
            page:
              page === Math.ceil(searchedPosts.length / 4) ? page : page + 1,
          },
        }} 
      >
        Next
      </Link></Button>
    </div>
  );
};

export default Pagination;
